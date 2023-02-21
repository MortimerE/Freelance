import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

"""
a: Problem Description
Using a dataset of diversity statistics for different companies/organizations, I hope to identify potential
hiring bias across different industries. What is the correlation between an industry and its general demographic diversity? 
If a demographic is highly correlated to a type of company, that industry may exhibit bias in terms of 
demographic selection - in otherwords, ethnic stereotypes. 
"""

# Section 1: Heatmap

# Data ingestion
data = pd.read_csv('./Employee Diversity in Tech.csv', header = 1)

# Remove the date column
data.drop(columns=["Company", "Date"], inplace=True)

# Rearranging the data into something usable
rearranged_data = []
data.fillna(0, inplace=True)
data.replace(' -   ', 0, inplace=True)
data[data.columns[1:9]] = data[data.columns[1:9]].astype(float)
demographic_columns = data.columns[1:9]
for i in range(data.shape[0]):
    # Get the values of the first column and the demographic columns
    row_type = data.iloc[i, 0]
    demographic_values = data.iloc[i, 1:9].tolist()
    # Loop through the demographic columns and values
    for j, demographic in enumerate(demographic_columns):
        # Append the row type, demographic, and demographic value to the rearranged_data list
        rearranged_data.append([row_type, demographic, demographic_values[j]])

# Convert the rearranged_data list to a pandas DataFrame
data = pd.DataFrame(rearranged_data, columns=["Type", "Demographic", "Value"])
print(data.values)


"""
b: Dataset introduction
This dataset spans a few years of hiring demographic information for a variety of companies. It breaks down each company
into an industry, and gives information regarding the % of male, female, white, asian, black, etc. employees. I am just 
interested in the relationship of industries to hiring rates, and not specific companies, so I have removed the "Company"
column. Additionally, I am ignoring the timespan so I can experiment with a larger dataset, although I know this can 
cause skewing. The table shows an aggregated modified dataset, while the scatterplot shows a spread of hiring rates 
for specific demographics.
"""
# b - Table 
grouped = data.groupby(["Type", "Demographic"]).mean()
grouped = grouped.reset_index()
grouped = grouped[["Type", "Demographic", "Value"]]
table = plt.table(cellText=grouped.values, colLabels=grouped.columns, loc='center')
plt.axis('off')
plt.show()

# b - Scatterplot 
x = data["Demographic"]
y = data["Value"]
plt.scatter(x, y)

plt.xlabel('Demographic')
plt.ylabel('Percentage of Company')
plt.title('Scatterplot of Demographic Percentages')
plt.show()

"""
c - Heatmap 
This heatmap can be used to show the correlation of each demographic to the "type" variable (industry). Using the spearman
method, it demonstrates a non-parametric monophonic correlation between the values, providing insight into 
which ethnic groups' hiring rates are heavily affected by the industry they might be trying to work in. 
High correlation may indicate industry-wide hiring biases regarding certain ethnic groups, and an increased
need for diversity. Conversely, this data could be used to demonstrate that a seemingly non-diverse company could 
actually be doing a better job of diverse hiring than their peers, despite having a skewed demographic spread.
"""
# Group data by Type and Demographic and get the mean of values
grouped = data.groupby(['Type', 'Demographic'], as_index=False).mean()
print(grouped.columns)
# Pivot the data to create the heatmap
pivot_table = grouped.pivot(index='Demographic', columns='Type', values='Value')

# Plot the heatmap
sns.heatmap(pivot_table, annot=True, cmap="coolwarm")
plt.title("Average value of demographic by type")
plt.show()
