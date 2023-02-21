import pandas as pd
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, mean_absolute_error
from statsmodels.stats.outliers_influence import variance_inflation_factor

# Importing data 
data = pd.read_csv('./Employee Diversity in Tech.csv', header = 1)
data.drop(columns=["Company", "Date"], inplace=True)
data.fillna(0, inplace=True)
data.replace(' -   ', 0, inplace=True)
data[data.columns[1:9]] = data[data.columns[1:9]].astype(float)
demographic_columns = data.columns[1:9]
data['Type'] = data['Type'].astype('category') # Encoding the type column for usability
data['Type'] = data['Type'].cat.codes

"""
Linear regression is best suited on continuous variables with a linear relationship. This dataset and problem space 
is not ideal for linear regression, but I was interested in running LR to see if I could predict the % of male employees
based on the demographic spread and type of a given company. Encoding the type variable may cause issues with how the 
calculations and dataset model continuity, since type is categorical and not continuous. 
"""

# Paritioning 
X = data.drop("Male %", axis=1)
y = data["Male %"]
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
reg = LinearRegression().fit(X_train, y_train)

# Evaluate the model on the test data
r2 = reg.score(X_test, y_test)
print(f"Test R^2: {r2:.2f}")

# Predict the target variable on the test data
y_pred = reg.predict(X_test)

# Plot the scatterplot of the target variable in the test data
plt.scatter(y_test, y_pred)
plt.xlabel('True Values')
plt.ylabel('Predictions')
plt.show()

vif = [variance_inflation_factor(X.values, i) for i in range(X.shape[1])]
vif = round(np.average(vif), 2)

rmse = np.sqrt(mean_squared_error(y_test, y_pred))
mae = mean_absolute_error(y_test, y_pred)

print(f"VIF: {vif}, RMSE: {rmse:.2f}, MAE: {mae:.2f}")

"""
This experiment had an RMSE (root mean squared error) of , an MAE (mean absolute error) of , and a 
VIF (variance inflation factor) of . The high RMSE and MAE indicate significant error in the problem, which means 
the input variables of industry type and demographic spread are not good indicators of % male employees. Since RMSE
and MAE indicated similar error margins, this dataset likely not skewed by major outliers. 
The high VIF indicates that there is a high likelihood of multilinearity present in the problem, implying that 
the dataset has too many conflating variables to draw meaningful conclusions. 
"""