#generate graphs
library(ggplot2)

# Create a standard features dataframe
baselineFeatures <- c("row", "col", "nul", "in_link", "out_link", "pgcount", "tImp", "tPF", "leftColhits", "SecColhits", "bodyhits", 
               "PMI", "qInPgTitle", "qInTableTitle", "yRank", "csr_score", "idf1", "idf2", "idf3", "idf4", "idf5", "idf6")
bEntFeatures <- c("max", "sum", "avg", "sim")
wEmbFeatures <- c("emax", "esum", "eavg", "esim")
bCatFeatures <- c("cmax", "csum", "cavg", "csim")
gEmbFeatures <- c("remax", "resum", "reavg", "resim")

types <- c(rep("novel", length(c(bEntFeatures,wEmbFeatures,bCatFeatures,gEmbFeatures))), rep("baseline", length(baselineFeatures)) ) 
features <- data.frame("feature"=c(bEntFeatures,wEmbFeatures,bCatFeatures,gEmbFeatures,baselineFeatures), "type"=types, "importance" = rep(0, length(types)))

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

features
p4<-ggplot(features, aes(x = reorder(feature, -importance), importance, fill = type)) + 
  geom_bar(stat="identity", position = "dodge") + 
scale_fill_brewer(palette = "Set2") + theme(axis.text.x = element_text(angle = 90, hjust=1, vjust=0))
p4

######################
#Recreate figure 5
######################

#import evals
bCatEval <- read.delim("./result/eval.txt", header = FALSE, sep = "\t", dec = ".") # Scores for the Bag of Categories
bEntEval <- read.delim("./result/eval.txt", header = FALSE, sep = "\t", dec = ".") # Scores for the Bag of Entities
wEmbEval <- read.delim("./result/eval.txt", header = FALSE, sep = "\t", dec = ".") # Scores for the word embeddings
gEmbEval <- read.delim("./result/eval.txt", header = FALSE, sep = "\t", dec = ".") # Scores for the graph embedding
strEval <- read.delim("./result/eval.txt", header = FALSE, sep = "\t", dec = ".") # Scores for combined representation
ltrEval <- read.delim("./result/eval_ltr.txt", header = FALSE, sep = "\t", dec = ".")

###
# Preprocessing
###
#split last row (avg) from eval
bCatEvalAll <- bCatEval[nrow(bCatEval),]
bCatEval <- bCatEval[1:(nrow(bCatEval)-1),]
bEntEvalAll <- bEntEval[nrow(bEntEval),]
bEntEval <- bEntEval[1:(nrow(bEntEval)-1),]
wEmbEvalAll <- wEmbEval[nrow(wEmbEval),]
wEmbEval <- wEmbEval[1:(nrow(wEmbEval)-1),]
gEmbEvalAll <- gEmbEval[nrow(gEmbEval),]
gEmbEval <- gEmbEval[1:(nrow(gEmbEval)-1),]

strEvalAll <- strEval[nrow(strEval),]
strEval <- strEval[1:(nrow(strEval)-1),]
ltrEvalAll <- ltrEval[nrow(ltrEval),]
ltrEval <- ltrEval[1:(nrow(ltrEval)-1),]

names(bCatEval) <- c("metric","query", "score")
names(bEntEval) <- c("metric","query", "score")
names(wEmbEval) <- c("metric","query", "score")
names(gEmbEval) <- c("metric","query", "score")
names(strEval) <- c("metric","query", "score")
names(ltrEval) <- c("metric","query", "score")
bCatEval$query <- sapply(bCatEval$query, as.numeric)
bEntEval$query <- sapply(bEntEval$query, as.numeric)
wEmbEval$query <- sapply(wEmbEval$query, as.numeric)
gEmbEval$query <- sapply(gEmbEval$query, as.numeric)
strEval$query <- sapply(strEval$query, as.numeric)
ltrEval$query <- sapply(ltrEval$query, as.numeric)

#for each representation type

strEval

bCatEval
ltrEval

bCatEval$diff <- bCatEval$score - ltrEval$score
bEntEval$diff <- bEntEval$score - ltrEval$score
wEmbEval$diff <- wEmbEval$score - ltrEval$score
gEmbEval$diff <- gEmbEval$score - ltrEval$score

# create a histogram for each representation

p5a <- ggplot(bCatEval, aes(x=diff)) + geom_histogram(binwidth=0.1, color="orange", fill="orange")
p5a

p5b <- ggplot(bEntEval, aes(x=diff)) + geom_histogram(binwidth=0.1, color="orange", fill="orange")
p5b

p5c <- ggplot(wEmbEval, aes(x=diff)) + geom_histogram(binwidth=0.1, color="orange", fill="orange")
p5c

p5d <- ggplot(gEmbEval, aes(x=diff)) + geom_histogram(binwidth=0.1, color="orange", fill="orange")
p5d

######################
#Recreate figure 6
######################


strSub1 <- subset(strEval, query <= 30)
strSub2 <- subset(strEval, query > 30)
ltrSub1 <- subset(ltrEval, query <= 30)
ltrSub2 <- subset(ltrEval, query > 30)

df6 <- data.frame("method" = c("LTR", "LTR", "STR", "STR"), 
                 "subset" = c("QS-1", "QS-2", "QS-1", "QS-2"),
"scores" = c(mean(ltrSub1$score),mean(ltrSub2$score),mean(strSub1$score),mean(strSub2$score))
)

p6<-ggplot(df6, aes(factor(subset), scores, fill = method)) + 
  geom_bar(stat="identity", position = "dodge") + 
  scale_fill_brewer(palette = "Set2")
p6

####################
#Recreate figure 7
######################

strSub1$diff <- strSub1$score - ltrSub1$score
strSub2$diff <- strSub2$score - ltrSub2$score

p7a<-ggplot(strSub1, aes(x = reorder(query, -diff), diff)) + 
  geom_bar(stat="identity", position = "dodge") + 
  scale_fill_brewer(palette = "Set2")
p7a

p7b<-ggplot(strSub2, aes(x = reorder(query, -diff), diff)) + 
  geom_bar(stat="identity", position = "dodge") + 
  scale_fill_brewer(palette = "Set2")
p7b
