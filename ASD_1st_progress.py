# %%
import pandas as pd
import numpy as np

file_path = r"C:\Users\kavis\OneDrive\Desktop\Projects\ASD\data_csv.csv"
df = pd.read_csv(file_path, na_values=['?'])

df = df.fillna(df.mode().iloc[0])

print("Missing values after cleaning:", df.isnull().sum().sum())

# %%
from sklearn.preprocessing import LabelEncoder

le = LabelEncoder()

categorical_cols = [
    'Speech Delay/Language Disorder', 'Learning disorder', 
    'Genetic_Disorders', 'Depression', 
    'Global developmental delay/intellectual disability', 
    'Social/Behavioural Issues', 'Anxiety_disorder', 
    'Sex', 'Ethnicity', 'Jaundice', 'Family_mem_with_ASD', 
    'Who_completed_the_test', 'ASD_traits'
]

for col in categorical_cols:
    df[col] = le.fit_transform(df[col].astype(str))

df.head()

# %%
from sklearn.model_selection import train_test_split

X = df.drop([
    'ASD_traits', 
    "CASE_NO_PATIENT'S", 
    'Qchat_10_Score', 
    'Childhood Autism Rating Scale', 
    'Social_Responsiveness_Scale'
], axis=1)

y = df['ASD_traits']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)

print(f"Training set size: {len(X_train)}")
print(f"Testing set size: {len(X_test)}")

# %%
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report

rf_model = RandomForestClassifier(n_estimators=100, random_state=42)
rf_model.fit(X_train, y_train)

rf_pred = rf_model.predict(X_test)
rf_accuracy = accuracy_score(y_test, rf_pred)

print(f"Random Forest True Accuracy: {rf_accuracy * 100:.2f}%")
print("\nDetailed Report:\n", classification_report(y_test, rf_pred))

# %%
from sklearn.svm import SVC
from sklearn.preprocessing import StandardScaler

scaler = StandardScaler()
X_train_scaled_array = scaler.fit_transform(X_train)
X_test_scaled_array = scaler.transform(X_test)

X_train_scaled = pd.DataFrame(X_train_scaled_array, columns=X_train.columns)
X_test_scaled = pd.DataFrame(X_test_scaled_array, columns=X_test.columns)

svm_model = SVC(kernel='rbf', C=1.0, gamma='scale', random_state=42)
svm_model.fit(X_train_scaled, y_train)

svm_pred = svm_model.predict(X_test_scaled)
svm_accuracy = accuracy_score(y_test, svm_pred)

print(f"SVM True Accuracy: {svm_accuracy * 100:.2f}%")
print("\nSVM Detailed Report:\n", classification_report(y_test, svm_pred))

# %%
import matplotlib.pyplot as plt
import seaborn as sns
import pandas as pd

importances = rf_model.feature_importances_
feature_names = X.columns
importance_df = pd.DataFrame({'Feature': feature_names, 'Importance': importances}).sort_values(by='Importance', ascending=False)

plt.figure(figsize=(10, 6))
sns.barplot(
    x='Importance', 
    y='Feature', 
    data=importance_df.head(10), 
    hue='Feature',    
    palette='viridis', 
    legend=False       
)

plt.title('Top 10 Clinical & Behavioral Features for ASD Detection')
plt.xlabel('Importance Score')
plt.ylabel('Feature')
plt.tight_layout()
plt.show()

print("Top 5 Indicators:")
print(importance_df.head(5))

# %%
from sklearn.metrics import confusion_matrix, ConfusionMatrixDisplay
import matplotlib.pyplot as plt

rf_cm = confusion_matrix(y_test, rf_pred)
rf_disp = ConfusionMatrixDisplay(confusion_matrix=rf_cm, display_labels=['No ASD', 'ASD'])

svm_cm = confusion_matrix(y_test, svm_pred)
svm_disp = ConfusionMatrixDisplay(confusion_matrix=svm_cm, display_labels=['No ASD', 'ASD'])

fig, axes = plt.subplots(1, 2, figsize=(12, 5))

rf_disp.plot(ax=axes[0], cmap='Blues', colorbar=False)
axes[0].set_title('Random Forest Confusion Matrix')

svm_disp.plot(ax=axes[1], cmap='Greens', colorbar=False)
axes[1].set_title('SVM Confusion Matrix (Scaled)')

plt.tight_layout()
plt.show()

# %%
import joblib

joblib.dump(rf_model, 'asd_rf_kaggle_model.pkl')
print("Random Forest model saved successfully!")

joblib.dump(svm_model, 'asd_svm_kaggle_model.pkl')
joblib.dump(scaler, 'asd_svm_scaler.pkl')
print("SVM model and Scaler saved successfully!")

# %%
import pandas as pd
from sklearn.metrics import precision_score, recall_score, f1_score

comparison_data = {
    'Model': ['Random Forest', 'SVM (RBF)'],
    'Accuracy (%)': [rf_accuracy * 100, svm_accuracy * 100],
    
    'Precision': [precision_score(y_test, rf_pred) * 100, precision_score(y_test, svm_pred) * 100],
    'Recall': [recall_score(y_test, rf_pred) * 100, recall_score(y_test, svm_pred) * 100],
    'F1-Score': [f1_score(y_test, rf_pred) * 100, f1_score(y_test, svm_pred) * 100]
}

comparison_df = pd.DataFrame(comparison_data)

comparison_df = comparison_df.round(2)

print("FINAL MODEL COMPARISON")
print(comparison_df.to_string(index=False))

# %%
import pandas as pd

sample_patients = X_test.sample(20, random_state=42)

actual_diagnoses = y_test.loc[sample_patients.index]

rf_predictions = rf_model.predict(sample_patients)

sample_patients_scaled = scaler.transform(sample_patients)
sample_patients_scaled_df = pd.DataFrame(sample_patients_scaled, columns=sample_patients.columns)
svm_predictions = svm_model.predict(sample_patients_scaled_df)

results_df = pd.DataFrame({
    'Patient ID (Row Index)': sample_patients.index,
    'Actual True Diagnosis': actual_diagnoses.values,
    'Random Forest Prediction': rf_predictions,
    'SVM Prediction': svm_predictions
})

print("AI Model Testing (20 Random Patients)")
print(results_df.to_string(index=False))


