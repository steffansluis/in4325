#generate graphs
library(ggplot2)

baselineFeatures <- c("row", "col", "nul", "in_link", "out_link", "pgcount", "tImp", "tPF", "leftColhits", "SecColhits", "bodyhits", 
               "PMI", "qInPgTitle", "qInTableTitle", "yRank", "csr_score", "idf1", "idf2", "idf3", "idf4", "idf5", "idf6")
bEntFeatures <- c("max", "sum", "avg", "sim")
wEmbFeatures <- c("emax", "esum", "eavg", "esim")
bCatFeatures <- c("cmax", "csum", "cavg", "csim")
gEmbFeatures <- c("remax", "resum", "reavg", "resim")

types <- c(rep("baseline", length(baselineFeatures)), rep("novel", length(c(bEntFeatures,wEmbFeatures,bCatFeatures,gEmbFeatures))) ) 

types

features <- data.frame("feature"=c(baselineFeatures,bEntFeatures,wEmbFeatures,bCatFeatures,gEmbFeatures), "type"=types, "importance" = rep(0, length(types)))

features

##############
# Import data
##############
setwd("C:\\Users\\Claudio\\Stack\\TU Delft\\2017-2019 Information Architecture\\Q3 - IN4325 - Information Retrieval\\Project\\in4325")


######################
#Recreate figure 4
######################

# Parse feature importances into a dataframe
rawFeatures <- read.delim("./result/features.txt", header = FALSE, sep = "\t", dec = ".")
rawFeatures <- rawFeatures[2:(nrow(rawFeatures)-1),]
rawFeatures <- data.frame("feature"= rawFeatures[1:nrow(rawFeatures),1], "score"= rawFeatures[1:nrow(rawFeatures),2])

# find feature importances
for(i in 1:nrow(rawFeatures)) {
  row <- rawFeatures[i,]
  # assign to the right feature
  for(j in 1:nrow(features)){
    ft <- features[j,]
    if(ft$feature == row$feature){
      features[j,]$importance <- row$score
      break
    }
  }
}

p4<-ggplot(features, aes(x = reorder(feature, -importance), importance, fill = reorder(type, -type))) + 
  geom_bar(stat="identity", position = "dodge") + 
  scale_fill_brewer(palette = "Set1")
p4

######################
#Recreate figure 5
######################



######################
#Recreate figure 6
######################

#import evals
strEval <- read.delim("./result/eval.txt", header = FALSE, sep = "\t", dec = ".")
ltrEval <- read.delim("./result/eval.txt", header = FALSE, sep = "\t", dec = ".")

###
# Preprocessing
###
names(strEval) <- c("metric","query", "score")
names(ltrEval) <- c("metric","query", "score")

#split last row from eval
strEvalAll <- strEval[nrow(strEval),]
strEval <- strEval[1:(nrow(strEval)-1),]
ltrEvalAll <- ltrEval[nrow(ltrEval),]
ltrEval <- ltrEval[1:(nrow(ltrEval)-1),]

strSub1 <- subset(strEval, as.numeric(query) <= 30)
strSub2 <- subset(strEval, as.numeric(query) > 30)
ltrSub1 <- subset(ltrEval, as.numeric(query) <= 30)
ltrSub2 <- subset(ltrEval, as.numeric(query) > 30)

df6 <- data.frame("method" = c("LTR", "LTR", "STR", "STR"), 
                 "subset" = c("QS-1", "QS-2", "QS-1", "QS-2"),
"scores" = c(mean(ltrSub1$score),mean(ltrSub2$score),mean(strSub1$score),mean(strSub2$score))
)

p6<-ggplot(df6, aes(factor(subset), scores, fill = method)) + 
  geom_bar(stat="identity", position = "dodge") + 
  scale_fill_brewer(palette = "Set1")
p6
