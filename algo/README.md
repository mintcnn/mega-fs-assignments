Part 2: Algorithm Programming

How to run:
python solve.py (in terminal)

Solve function
- loop the word_list (input)
- check each word and pass to their condition
1. check that is it first word that can concatenated to the target word 
    - check by find index to the target == 0 ?
    - if it is, store possible another word that can concatenated to this word to equal target word
2. check that is it second word that can concatenated to the target word 
    - check by find index to the reversed target == 0 ?
    - if it is, store possible another word that can concatenated to this word to equal target word 
3. finally, check that is the word in output store
    - if it is, return the answer

Complexity analysis
Time
- for loop -> O(n) ; n = length of word_list

