import random
you_love_me = random.choice([True, False])
me_love_you = random.randint(1, 10) #

#你爱我或不爱我   
if you_love_me or (not you_love_me):
    #爱就在那里
    #不增不减
    me_love_you += 1
    me_love_you -= 1

#但你的：一句明天见
you_say = input()
while you_say =="I love you":
    #偷走了我
    #整晚的睡眠
    i_can_not_sleep = True
    print("I love you too")
    break

# 你爱我或不爱我
# 爱就在那里
# 不增不减
# 但你的一句明天见
# 偷走了我
# 整晚的睡眠
#来自pythontip 情书
