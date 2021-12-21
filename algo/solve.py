def solve(word_list, target):
    output_list = {}
    for i in range(len(word_list)):
        if word_list[i] in output_list:
            # find word that can concatenated to target word
            if target.find(word_list[i]) == 0:
                return (word_list[i], output_list[word_list[i]])
            else:
                return (output_list[word_list[i]], word_list[i])
        elif target.find(word_list[i]) == 0:
            # find order -> is it first word of the concatenated word
            clone_target = target.removeprefix(word_list[i])
            output_list[clone_target] = word_list[i]
        elif target[::-1].find(word_list[i][::-1]) == 0:
            # find order -> is it second word of the concatenated word
            clone_target = target.removesuffix(word_list[i])
            output_list[clone_target] = word_list[i]
    return None


print(solve(['ab', 'bc', 'cd'], 'abcd'))
print(solve(['ab', 'bc', 'cd'], 'cdab'))
print(solve(['ab', 'bc', 'cd'], 'abab'))
print(solve(['ab', 'ab', 'cd'], 'abab'))
print(solve(['ababcd', 'abab', 'cdd', 'd'], 'ababcdd'))
