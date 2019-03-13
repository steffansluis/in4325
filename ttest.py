#!/usr/bin/env python
import numpy as np
import pandas as pd
from scipy import stats
from statsmodels.stats import weightstats
import sys

if len(sys.argv) > 3:
	METRIC = sys.argv[3]
else:
	METRIC = 'map'

system_a = sys.argv[1]
system_b = sys.argv[2]

tnames = ['measure', 'topic', 'value']
dfA = pd.read_table(system_a, delim_whitespace=True, header=None, names=tnames)
dfB = pd.read_table(system_b, delim_whitespace=True, header=None, names=tnames)

# dfA = dfA.pivot_table(values='value', index='topic', columns='measure', aggfunc = lambda x: x)
# dfB = dfB.pivot_table(values='value', index='topic', columns='measure', aggfunc = lambda x: x)
dfA = dfA.pivot_table(values='value', index='topic', columns='measure')
dfB = dfB.pivot_table(values='value', index='topic', columns='measure')

# drop the row with 'all' results
dfA.drop(['all'], inplace=True)
dfB.drop(['all'], inplace=True)

# try:
#     # drop runid column
#     dfA.drop('runid', axis=1, inplace=True)
#     dfB.drop('runid', axis=1, inplace=True)
# except ValueError, e:
#     pass

df = dfA[[METRIC]].copy()
df.columns = ['A']
df['B'] = dfB[[METRIC]]

# pd.to_numeric() pandas 0.17 alternative
df[['A', 'B']] = df[['A', 'B']].astype(float)

df['d'] = df['B'] - df['A']
d = df['d'].mean()

df['V'] = np.power(df['d'] - d, 2)
V = df['V'].mean()

n = df.shape[0]

valuesA = df['A'].as_matrix()
valuesB = df['B'].as_matrix()


espairedt = d / np.sqrt(V)

MEP = 0.05
tinv = stats.t.ppf(1 - (MEP / 2), n - 1)
me = tinv * np.sqrt(V / n)

# paired t-test
# e.g., before and after a treatment
# ttest_rel(post, pre)
# print(valuesB)
# print(valuesA)

t, p = stats.ttest_rel(valuesB, valuesA) # stats.ttest_1samp(valuesB - valuesA, 0)
print('Difference')
print('The t-statistic is {0:.4f} and the p-value is {1:f}'.format(t, p))
print('>>',)
if p < 0.01 and t > 0:
    print('0.01')
elif p < 0.05 and t > 0:
    print('0.05')
else:
    print('NOT')


if p < 0.05 and t > 0:
    print("According to a two-sided paired t-test for the difference in means \(\mean{{d}} = {0:.4f}\) "
        "(with the unbiased estimate of the population variance \(V = {1:.4f}\)), "
        "System {8:s} statistically significantly outperforms {9:s} "
        "\((t({2}) = {3:.2f}\), "
        "\(p < {4:f}\), "
        "\(ES_{{pairedt}} = {5:.2f}\), "
        "95\% CI \([{6:.4f},{7:.4f}]\))".format(d, V, n-1, t, p, espairedt, d-me, d+me, system_b, system_a))