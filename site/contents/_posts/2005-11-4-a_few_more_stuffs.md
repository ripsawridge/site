---
title: a few more stuffs
date: 2005-11-4
layout: post
---

Wow, just now I went to the little supermarket. I got a big bag of cookies
for 89 cents! Anyway, I was standing in line and the guy in front of me
got into a big argument with the cashier. She started shouting "Sie sind
krank! krank!" which of course means either:
  
  
"You are sick! sick!"
  
  
or
  
  
"They are sick! sick!"
  
  
depending on a context record that I didn't have. Either way, it sounded
like this man was some kind of "local pariah" judging by the woman's outraged
indignation at the stuff he was saying. Gosh, I wish I understood...
  
---
  
Work is really fun! The weather isn't very good this weekend so I'm not
sure how far I'll stray from home. But I was thinking of going to work
just to keep having fun with this project. I forgot how much I outlined
before, but for this first project I am making a virtual table view on
the object-oriented database (implemented in C++) we have. As I've plowed
along, exposing more and more of the system through "tables," my eventual
goal is to be able to join them in sql select statements. Also, an UPDATE
statement would be really helpful. This tool will help product support
to examine a database in a straightforward way (I mean, how do you "look"
at an oo db?), and with the update statement might save someone's bacon
sometime.
  
  
Today I programmed the WHERE clause to work for one table, building the
expression grammar and associated tree to handle the boolean logic and
decide if a particular "row" is good to print.
  
  
But I'll almost have to start over to handle multiple tables. You see,
there is a lot of work under the covers when you write something like
  
  
select \* from object\_table ot, property\_table pt where ot.ID = pt.ID
  
  
In the least optimized cast, you have length(ot) \* length(pt) rows, and
without ordering of table pt, you have to walk all of table pt length(ot)
times! So without some intelligence gleaned from the where clause the performance
would be awful. So, my work will be to think about query plans, coming
up with a notion of Primary/Secondary keys, indexes, and following hints
about which table should be primary (ot or pt). I never thought I'd be
implementing SQL!
  
  
My boss showed me a parser generator program called ANTLR, and I'm using
that to implement the SQL grammar. I have to say I really like this tool.
You create a grammar file and it spits out C++ files. Here is the real
benefit: the C++ files look exactly like you would write yourself if you
were writing a recursive descent parser. This is much better than a YACC
grammar where it is impossible to read or debug the generated code.
  
  
All in all, I'm very relieved at how fun and interesting the work is.
I did my best beforehand to suss this kind of thing out, but I was steeled
to accept either a precarious fire drill existence or mind-numbing beauracracy.
Gott sei dank that I have had to put up with neither!
  
  
Last night we had a tabletop football tournament at work. I was terrible,
but because my partner (Harald) was so good, we made it to the "semi-finals."
I had a Subway sandwich which tasted just like back home (no "saurkraut
sauce" or anything unpleasant :=)).
  
  
I can't wait to see _the boyos_ and Kris. Skype really helps close
the gap though, Kris and I can still have a "closing of the days business"
talk, and it seems like she's right here. Of course she is starting the
next day! Anyway, I can't wait for us to be in our apartment, it is so
nice. And yesterday I went out to eat at **Sitar**, the Indian
food restaurant just two blocks from our apartment. Super good. Living
in a city is pretty neat.
  
  
I wasn't really ready to talk about it earlier, but I want to ask for
positive thoughts for my friend Mat. He injured his knee Sunday while saving
my life on a mountain called the Musterstein. He might have a torn ACL,
at least there is a fair amount of swelling. He can walk fine, but certain
ways of moving the knee aren't working right. Before I go into the details
I want to say that this accident has forced me to realign myself completely
in how I think about the mountains, what I'm going to do in them, and who
I want to be for my family. I've confronted death in a way I wouldn't wish
on anybody, but I think that ultimately it is a good thing for me. However,
I can't ever really feel that way until I know that Mat's knee is going
to be ok.
  
  
Mat, Ari and I were enjoying such an amazing weekend. We went shopping
in the morning, then I loaned my iPod to Ari who liked it so much she stayed
home and cleaned/redecorated the house with it. She ran the battery totally
down, which is awesome. Mat and I first did a 6 pitch rock climb, then
hiked up to a beautiful hut behind his house and had beer and cake in the
best mountain scenery. For dinner, Ari made this great chicken dish with
a spicy sauce and wine. We also spent a few hours speaking only German,
which was great for me. They had a lot of patience, for sure!
  
  
Sunday Mat and I made the hike up to the Musterstein, starting from the
little Austrian village of Lasching. We left the trail and scrambled for
several hundred feet to the rope-up point. I took the first pitch, which
I thought was really easy for a grade V (about 5.8 in the U.S. grading
system). A few pitches later I volunteered to lead a grade VI pitch. I
set out, and it schooled me really good. In fact, I stopped at a belay
spot halfway up to let Mat finish it. Good thing too, because I couldn't
even follow the second half cleanly. It climbed an overhanging wall protected
by bolts with almost nothing for fingers. Above that pitch I set out again,
climbing up to a steep corner and actually thinking about lowering down
and giving this pitch to Mat too (he has practically boundless strength).
I should have, because after a series of rapid events, I fell and ripped
out a piton on the way down. I fell about 60 feet, and it was long enough
for me to believe it was the end. I expected a short fall, but then I saw
the piton fly out from the face above me and the rope flipped me over so
that I was hurtling face-first towards the lower mountain. I thought of
Kris and Elijah and Rowan, and how I wouldn't be there. I was simply, very
sad.
  
  
After a impact I realized I hadn't received a killing blow, and that I
was hanging upside down with my legs tangled in the rope. I heard Mat groaning
above me and was just generally dazed for a few seconds. I was thrilled
to realize I could move all my limbs and wasn't bleeding. I untangled myself
while hanging in space, then pushed over to a bolt on the wall to clip
myself in. Mat needed me to untie from the ropes, so I did. After awhile
he rappelled down (wisely ignoring my bizarre comment "I think I can keep
climbing, if you lead that pitch!"). Mat had a awful looking wound on his
hand where the rope had burned away a strip of flesh on front and back.
He had a similar wound on his neck, and he was initially afraid his leg
was broken from the way the rope wrapped around it. "It's like being run
over by a truck slowly," he said of the way my plummeting weight tightened
the rope around his leg.
  
  
When a climber falls on a rope the impact on the belayer is usually low,
because there is some protection in the rock above the belayer. But because
the piton had pulled out and because I ran it out on easy ground above
his belay (a no-no that people who become complacent or too casual regularly
engage in - as I did), the impact on Mat was tremendous. Many belayers
have lost control of the rope at this point, and it would whistle away
so fast that it couldn't be touched without searing pain. Had that happened,
I certainly wouldn't be here. Instead, Mat was slammed around, burnt, wounded
and "run over by a truck" up at the belay to hold me.
  
  
We were able to rescue ourselves, making 5 200 foot rappels to get down
from the middle of the cliff face. We reflected that I had been lucky,
in a way, that the route was so hard. Although that was part of what led
to the fall, the steepness of the rock saved me from hitting anything that
would break bones or worse: I was like a cat in the air, said Mat. He barely
dodged out of the way to avoid me. "I thought you were dead for sure,"
he said.
  
  
We hiked down, only slowed down a little by Mat's knee. My only injury
is a big scrape on the hand, and huge purple bruises on my calves from
the squeezing of the rope. Also on my right tricep, but I don't know why.
  
  
I've finally had the truism "climbing is dangerous" brought home to me
in a visceral way. I also feel the responsibility of someone who, in hindsight
had a lot of reasons why he shouldn't have climbed that particular pitch,
and suppressed them all, for a variety reasons including laziness and ego.
Mat is injured because of this accident, and there is nothing that can
put a sober cast on the day more than the injury of a friend when you feel
any measure at all of responsibility.
  
  
And I feel plenty.
  
  
All of this is changing me inside, and I understand how fragile and precious
life is now. I owe it to these friends and family that I love to change
any aspects of my thinking that need to be changed. I humbly submit that
to do this right is what I want more than anything.
  
  
So...in Europe for a week and "the gods" have slapped me (and Mat) down _**hard**. _I
feel bad reporting such grim news, I'm not very good at this kind of news.
Anyway, I'm going to stay off the hard climbs, and think about what originally
brought me to the mountains, what made them such a spirtually comforting
and energizing force for me. I feel that by constantly "one-upping" myself
and climbing things ever harder and harder, I turned away from what makes
the mountains a life-sustaining place. Instead, I was getting an ego boost
and gradually losing the ability to make prudent decisions (decisions that
might make you lose face or appear weak -- a condition usually feared all
out of proportion to the actual result). I still want to climb, and for
my family to climb together. But I'm fencing myself off from certain desires,
and I want to puzzle out why for some time the "darker, steeper, scarier"
climb was by definition "better."
  
  
Okay enough of that. Please send your prayers and energy to Mat's knee.
It lives with the rest of him in Garmisch, Germany right under the Zugspitze.
