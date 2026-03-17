var SUBS=["Some questions change the person asking them.", "Not all conversations end.", "Two people. One direction. Down.", "What you find depends on how far you go.", "The deepest questions have no bottom.", "You came here for a reason."];

var CATS=
[
  {
    id:"existence",
    name:"Existence",
    sub:"What is real?",
    col:"#9B7E5A",
    px:22,
    py:18,
    root:{
      q:"If you disappeared tomorrow — how much of the world would actually change?",
      br:[
        {
          label:"More than I realize",
          q:"What would have to happen for your absence to leave a permanent mark — are you building toward it, or hoping?",
          br:[
            {
              label:"Building toward it",
              q:"Is what you're building actually what you want — or the version that sounds right to say?",
              br:[
                {
                  label:"What I actually want",
                  q:"When did you last do something purely because it mattered to you — no audience, no record?",
                  br:[
                    {
                      label:"Recently",
                      q:"What was it — and why does it feel different from the rest of your life?"
                    },
                    {
                      label:"A long time ago",
                      q:"What got in the way? Not the story you tell — the real thing."
                    },
                    {
                      label:"I'm not sure I ever have",
                      q:"Is that loss, or just adulthood? Do you think those are different things?"
                    }
                  ]
                },
                {
                  label:"The version that sounds right",
                  q:"Who are you performing for — a specific person, a fear, or an idea of yourself you've never examined?",
                  br:[
                    {
                      label:"A specific person",
                      q:"What would they have to say for you to finally believe it? And would you?"
                    },
                    {
                      label:"A fear",
                      q:"Fear of what — being ordinary, being seen clearly, or being alone in what you want?"
                    },
                    {
                      label:"An idea of myself",
                      q:"Who created that idea? When did you first hear this was who you were supposed to become?"
                    }
                  ]
                },
                {
                  label:"I don't know the difference",
                  q:"What would it feel like to want something with no justification — nothing beyond that it pulls at you?",
                  br:[
                    {
                      label:"Like freedom",
                      q:"What's in the way — a wall, or a door you've been treating as a wall?"
                    },
                    {
                      label:"Like selfishness",
                      q:"Who taught you your desires needed to be justified? Was the lesson necessary?"
                    },
                    {
                      label:"I've never felt that",
                      q:"Have you been trying not to feel it — or has it genuinely never arrived?"
                    }
                  ]
                }
              ]
            },
            {
              label:"Hoping for it",
              q:"What would move you from hoping to building?",
              br:[
                {
                  label:"Certainty I could succeed",
                  q:"If you knew you'd succeed — what would you start? What does waiting cost you daily?",
                  br:[
                    {
                      label:"Something creative",
                      q:"What's the smallest version you could make with no one watching?"
                    },
                    {
                      label:"Something relational",
                      q:"The connection you want — what's the actual first move? The real one."
                    },
                    {
                      label:"I don't know yet",
                      q:"Not knowing is sometimes honest. Sometimes it's a story so we don't have to move. Which is yours?"
                    }
                  ]
                },
                {
                  label:"Permission from someone",
                  q:"Who — and when did you give them that authority over your life?",
                  br:[
                    {
                      label:"A parent or family",
                      q:"How old were you when you decided their approval mattered more than your own?"
                    },
                    {
                      label:"A future version of myself",
                      q:"What does that future self know that you don't trust yourself to know now?"
                    },
                    {
                      label:"I'm not sure who",
                      q:"The authority we give others is usually invisible. Where in your body do you feel it?"
                    }
                  ]
                },
                {
                  label:"Less fear",
                  q:"What exactly is the fear — losing, looking foolish, or something quieter?",
                  br:[
                    {
                      label:"Looking foolish",
                      q:"When was the last time you looked genuinely foolish to someone who mattered — and survived?"
                    },
                    {
                      label:"Something harder to name",
                      q:"Sit with it. If the fear had a shape, what would it be?"
                    },
                    {
                      label:"Actually failing",
                      q:"Walk through the worst version of failing. And then: what's still true about you after that?"
                    }
                  ]
                }
              ]
            },
            {
              label:"Legacy isn't the right measure",
              q:"If not legacy — what is? And are you actually living by that?",
              br:[
                {
                  label:"Presence, not legacy",
                  q:"When were you last completely here — no part of your mind elsewhere, no performance?",
                  br:[
                    {
                      label:"Not long ago",
                      q:"What made it possible? Why isn't that your default state?"
                    },
                    {
                      label:"A long time ago",
                      q:"What has accumulated that makes presence harder? What would you have to set down?"
                    },
                    {
                      label:"I can't remember",
                      q:"Is that loss, or have you stopped noticing? Which would be worse?"
                    }
                  ]
                },
                {
                  label:"Love given and received",
                  q:"Is there love you've received that you haven't fully let in — and do you know why?",
                  br:[
                    {
                      label:"Yes",
                      q:"What would it cost to receive it? What would you have to believe about yourself?"
                    },
                    {
                      label:"No — I take it fully",
                      q:"That's rarer than most admit. What made you someone who could do that?"
                    },
                    {
                      label:"I don't know",
                      q:"What would fully letting someone in feel like?"
                    }
                  ]
                },
                {
                  label:"I genuinely don't know",
                  q:"That not-knowing — is it peaceful, or unsettling?",
                  br:[
                    {
                      label:"Peaceful",
                      q:"When did the needing-an-answer stop? Was it a choice or an arrival?"
                    },
                    {
                      label:"Unsettling",
                      q:"What would any answer give you — what are you actually looking for underneath?"
                    },
                    {
                      label:"Both depending on the day",
                      q:"What determines which? What's different on the peaceful days?"
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          label:"Less than I want to admit",
          q:"Does realizing how replaceable you might be feel liberating — or lonely?",
          br:[
            {
              label:"Liberating",
              q:"If smallness is freedom, why do most people chase significance anyway?",
              br:[
                {
                  label:"Fear drives it",
                  q:"What are you still chasing that is, at root, about proving you existed?",
                  br:[
                    {
                      label:"Recognition in work",
                      q:"If you achieved it and no one ever knew — would it still matter the same way?"
                    },
                    {
                      label:"Being loved",
                      q:"Is the love you want for connection — or for confirmation? Which comes first?"
                    },
                    {
                      label:"I'm not chasing anything",
                      q:"Is that contentment — or protection? Sometimes not wanting is the safest thing."
                    }
                  ]
                },
                {
                  label:"Meaning is real beyond fear",
                  q:"Where does genuine meaning come from then?",
                  br:[
                    {
                      label:"Connection",
                      q:"The connections that felt most meaningful — what did they ask of you that comfortable ones didn't?"
                    },
                    {
                      label:"Making something",
                      q:"What have you made that exists that wouldn't without you? How does it feel to name it?"
                    },
                    {
                      label:"Still working it out",
                      q:"At what age did you expect to have it worked out? What's actually in the way?"
                    }
                  ]
                },
                {
                  label:"I hold the tension",
                  q:"What has living inside that paradox actually produced?",
                  br:[
                    {
                      label:"Tolerance for uncertainty",
                      q:"What are you most uncertain about right now? Can you stay with it without resolution?"
                    },
                    {
                      label:"Constant re-examination",
                      q:"Is there something you've re-examined so many times you're tired? What if you just stopped?"
                    },
                    {
                      label:"I'm not sure yet",
                      q:"What would you have to unlearn to receive meaning without earning it?"
                    }
                  ]
                }
              ]
            },
            {
              label:"Lonely",
              q:"Is loneliness the price of consciousness — or a signal pointing toward something?",
              br:[
                {
                  label:"The price we pay",
                  q:"If loneliness is built-in, what do you do with the people who seem to escape it?",
                  br:[
                    {
                      label:"I envy them",
                      q:"What specifically — the connection, or the ease? Are those the same thing?"
                    },
                    {
                      label:"I don't fully believe them",
                      q:"What would have to happen for you to believe someone was genuinely not lonely?"
                    },
                    {
                      label:"I find them suspicious",
                      q:"Is that projection — or wisdom? When has your suspicion about ease been correct?"
                    }
                  ]
                },
                {
                  label:"A signal toward something",
                  q:"What is it pointing toward that you haven't found?",
                  br:[
                    {
                      label:"A kind of intimacy",
                      q:"Not just closeness — a specific kind. Who's been the closest approximation?"
                    },
                    {
                      label:"A community or place",
                      q:"Have you ever felt genuinely at home somewhere? If yes — what happened to it?"
                    },
                    {
                      label:"Something in myself",
                      q:"The loneliness from being disconnected from yourself — when did that start?"
                    }
                  ]
                },
                {
                  label:"Both at different times",
                  q:"What determines which — who you've been near, or something you can't track?",
                  br:[
                    {
                      label:"Who I've been near",
                      q:"Which person makes loneliness feel most like signal rather than price?"
                    },
                    {
                      label:"How honest I've been",
                      q:"What happens to the loneliness when you stop performing? Does it get worse or better?"
                    },
                    {
                      label:"Something I can't track",
                      q:"What does your body do when the loneliness arrives? Where does it land?"
                    }
                  ]
                }
              ]
            },
            {
              label:"Both",
              q:"What would have to shift for the balance to move toward liberation?",
              br:[
                {
                  label:"Something external",
                  q:"When has waiting for the world to change worked for you — honestly?",
                  br:[
                    {
                      label:"It has sometimes",
                      q:"What was different about those times? What aligned that hasn't since?"
                    },
                    {
                      label:"Rarely",
                      q:"What's one internal shift that had more impact than any circumstance you changed?"
                    },
                    {
                      label:"I'm still waiting",
                      q:"For what exactly? And what are you doing while waiting?"
                    }
                  ]
                },
                {
                  label:"Something internal",
                  q:"What specifically would have to change in how you see yourself?",
                  br:[
                    {
                      label:"My relationship to failure",
                      q:"What does failure feel like in your body? Where does it land, how long does it stay?"
                    },
                    {
                      label:"My relationship to being seen",
                      q:"What version of you do you keep most from view — and who has seen it anyway?"
                    },
                    {
                      label:"I don't know yet",
                      q:"Not knowing what needs to change is sometimes the work itself."
                    }
                  ]
                },
                {
                  label:"Both together",
                  q:"When have you had to do inner and outer work simultaneously?",
                  br:[
                    {
                      label:"Overwhelming",
                      q:"What made it too much? Is there a version of that double-work happening now without a name?"
                    },
                    {
                      label:"Clarifying",
                      q:"What became clear when you had to move on two levels at once?"
                    },
                    {
                      label:"I haven't had that",
                      q:"What's the hardest simultaneous demand your life has placed on you? Were you present for it?"
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          label:"It depends who you ask",
          q:"Who would feel your absence most — and have you told them what they mean to you?",
          br:[
            {
              label:"I have told them",
              q:"What's left unsaid? Is there a love that words genuinely can't reach?",
              br:[
                {
                  label:"Yes — some things can't be said",
                  q:"What do you do with it — carry it, act it out, or does it sit as an ache?",
                  br:[
                    {
                      label:"Carry it",
                      q:"How long have you been carrying it? What would putting it down feel like?"
                    },
                    {
                      label:"Act it out",
                      q:"What's the action that comes closest to saying it? Does the person know?"
                    },
                    {
                      label:"It just sits there",
                      q:"Is the ache something you'd trade — or does it keep you close to something real?"
                    }
                  ]
                },
                {
                  label:"Everything important has been said",
                  q:"How did you get there — a conscious decision, a near-loss, or was it modeled?",
                  br:[
                    {
                      label:"A conscious decision",
                      q:"What catalyzed it? Is there anything you still circle without landing?"
                    },
                    {
                      label:"A near-loss",
                      q:"What almost happened — and what would still be unsaid if it had?"
                    },
                    {
                      label:"It was modeled for me",
                      q:"Who showed you? Is there someone who will one day say this about you?"
                    }
                  ]
                },
                {
                  label:"There's still something unsaid",
                  q:"Is it a statement — or a question you haven't had the courage to ask?",
                  br:[
                    {
                      label:"A statement",
                      q:"What stops you? Not the story — the real thing, in the room when you try."
                    },
                    {
                      label:"A question",
                      q:"What would change if you knew the answer? Which answer would be harder?"
                    },
                    {
                      label:"I'm not sure what",
                      q:"Sometimes the unsaid thing is just feeling, not language. What does it feel like when it surfaces?"
                    }
                  ]
                }
              ]
            },
            {
              label:"Not really",
              q:"What stops you — fear of making it real, or something stranger?",
              br:[
                {
                  label:"Fear of vulnerability",
                  q:"When was the last time you were vulnerable with someone and it went well?",
                  br:[
                    {
                      label:"Trust was already there",
                      q:"How was that trust built — and are you waiting for it somewhere without building it?"
                    },
                    {
                      label:"I had no choice",
                      q:"Forced vulnerability differs from offered. When have you offered it freely — and what happened?"
                    },
                    {
                      label:"I can't remember it going well",
                      q:"What has staying closed cost you? Not in theory — what specifically isn't in your life?"
                    }
                  ]
                },
                {
                  label:"I assume they know",
                  q:"Do they though — and is assuming serving you or them?",
                  br:[
                    {
                      label:"Probably both",
                      q:"What does a relationship look like when both people assume the other knows?"
                    },
                    {
                      label:"Serving me mostly",
                      q:"What would saying it out loud require — and what are you protecting yourself from?"
                    },
                    {
                      label:"I'm not sure",
                      q:"Say it to yourself first. How does it land?"
                    }
                  ]
                },
                {
                  label:"I don't want to make it strange",
                  q:"Why does expressing love risk making it strange? What norms did you absorb?",
                  br:[
                    {
                      label:"My family didn't say it",
                      q:"How did you know you were loved then — or did you?"
                    },
                    {
                      label:"It feels like pressure",
                      q:"Is that about them — or about needing them to respond a certain way?"
                    },
                    {
                      label:"I don't know where it comes from",
                      q:"What's the earliest memory of love feeling dangerous to say out loud?"
                    }
                  ]
                }
              ]
            },
            {
              label:"I'm not sure who would",
              q:"Is that about the relationships — or whether you've let anyone close enough?",
              br:[
                {
                  label:"The relationships are thin",
                  q:"When did they become thin — was there a moment, or was it gradual?",
                  br:[
                    {
                      label:"A specific moment",
                      q:"What happened — and did you grieve it, or just move forward?"
                    },
                    {
                      label:"Gradual",
                      q:"Which relationship drifted most? What would recovering it take — and do you want to?"
                    },
                    {
                      label:"I'm not sure",
                      q:"Are the relationships thin on both sides — or is one person holding more?"
                    }
                  ]
                },
                {
                  label:"I haven't let people close",
                  q:"What would it take to let someone need you — genuinely need you?",
                  br:[
                    {
                      label:"For me to need them first",
                      q:"Do you let yourself need people? What does needing someone cost you?"
                    },
                    {
                      label:"To trust it wouldn't be used against me",
                      q:"When was that trust broken first — and how much of your life organizes around not repeating it?"
                    },
                    {
                      label:"I don't know",
                      q:"Not knowing why you keep distance is itself a door. What would happen if you tried differently?"
                    }
                  ]
                },
                {
                  label:"I'm self-sufficient by design",
                  q:"Is that a strength — or the most defensible form of not needing anyone?",
                  br:[
                    {
                      label:"A genuine strength",
                      q:"What has it made possible — and what has it cost that you don't usually count?"
                    },
                    {
                      label:"Mostly defense",
                      q:"What would collapse if you let yourself be needed? What are you protecting?"
                    },
                    {
                      label:"I've stopped being sure",
                      q:"When did the certainty crack — what happened that made you question the design?"
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  },
  {
    id:"consciousness",
    name:"Consciousness",
    sub:"What is awareness?",
    col:"#4E7E6A",
    px:75,
    py:24,
    root:{
      q:"When you're dreaming, are you the same person as when you're awake?",
      br:[
        {
          label:"Same person, different state",
          q:"What exactly is the 'you' that persists — memory, values, or something you can't name?",
          br:[
            {
              label:"Memory holds it together",
              q:"If you lost all memories but kept your values — would you still be you?",
              br:[
                {
                  label:"Yes — values matter more",
                  q:"Has there been a version of yourself you'd consider a genuinely different person? When did the real one begin?",
                  br:[
                    {
                      label:"Yes, I've changed deeply",
                      q:"What caused the shift — loss, love, crisis, or just the slow accumulation of time?"
                    },
                    {
                      label:"I've always felt continuous",
                      q:"What's the thread? If you had to name the thing that's always been there, what is it?"
                    },
                    {
                      label:"I'm not sure",
                      q:"What's the earliest moment that still feels unmistakably yours?"
                    }
                  ]
                },
                {
                  label:"No — memory is the self",
                  q:"Then who are you on the days you can't access your past — distracted, in flow, beside yourself?",
                  br:[
                    {
                      label:"A fragment",
                      q:"What's it like in those moments — frightening, peaceful, or neither?"
                    },
                    {
                      label:"My body carries it",
                      q:"What does your body remember that your mind doesn't? When has it surprised you?"
                    },
                    {
                      label:"It unsettles me",
                      q:"What specifically — the impermanence, or what impermanence implies?"
                    }
                  ]
                },
                {
                  label:"Both somehow",
                  q:"Memory and values as dual anchors — what holds when both are shaken at once?",
                  br:[
                    {
                      label:"Other people hold the thread",
                      q:"Who holds the best version of your history — and do you trust their version?"
                    },
                    {
                      label:"The body",
                      q:"When have you been most aware of yourself as a body, not a story?"
                    },
                    {
                      label:"Nothing, and I've made peace",
                      q:"What does making peace with groundlessness feel like on an ordinary Tuesday?"
                    }
                  ]
                }
              ]
            },
            {
              label:"Values are the self",
              q:"But values change. What happens to 'you' when a core value shifts?",
              br:[
                {
                  label:"I become someone new",
                  q:"Have you gone through that? What did it feel like — liberation or disorientation?",
                  br:[
                    {
                      label:"Liberation",
                      q:"What did you leave behind — and is there grief you haven't acknowledged for it?"
                    },
                    {
                      label:"Disorientation",
                      q:"When did the ground return? What gave you something to stand on?"
                    },
                    {
                      label:"Both in stages",
                      q:"How do you know when the transition is complete — or does it ever fully complete?"
                    }
                  ]
                },
                {
                  label:"My core values haven't shifted",
                  q:"Which value is most central — and has it ever been genuinely tested?",
                  br:[
                    {
                      label:"Yes, severely",
                      q:"What was the test — and what did passing or failing teach you?"
                    },
                    {
                      label:"In small ways",
                      q:"Small tests are often more revealing. What small test are you facing right now?"
                    },
                    {
                      label:"Not yet",
                      q:"Is the absence of a real test something to be grateful for — or does it leave you uncertain?"
                    }
                  ]
                },
                {
                  label:"Values are a story I tell",
                  q:"If values are narrative — who's the author?",
                  br:[
                    {
                      label:"My past",
                      q:"Which part — the wounds, the joys, or the things you were told about yourself?"
                    },
                    {
                      label:"The people I love",
                      q:"Which person's values have you absorbed most deeply? Are they yours — or still borrowed?"
                    },
                    {
                      label:"I keep rewriting",
                      q:"What is the most recent revision — and what did it cost to make it?"
                    }
                  ]
                }
              ]
            },
            {
              label:"Something I can't name",
              q:"What's the closest you can get to describing it without quite naming it?",
              br:[
                {
                  label:"A sense of watching",
                  q:"Who is the watcher — and have you ever felt the watcher being watched?",
                  br:[
                    {
                      label:"Yes — it's vertiginous",
                      q:"What happened when you encountered that recursion? How did you find your way back?"
                    },
                    {
                      label:"No — the watcher is the floor",
                      q:"If the watcher is fundamental — what are you made of, beneath it?"
                    },
                    {
                      label:"I try not to look",
                      q:"What are you worried you'd find?"
                    }
                  ]
                },
                {
                  label:"A feeling of continuity",
                  q:"What breaks the continuity — grief, extreme joy, trauma, sleep?",
                  br:[
                    {
                      label:"Grief breaks it",
                      q:"What have you lost that reorganized who you were? Did you come back as the same person?"
                    },
                    {
                      label:"Transcendent experiences",
                      q:"When have you felt the self dissolve — even briefly? What was there instead?"
                    },
                    {
                      label:"I'm not sure continuity exists",
                      q:"If the self is constructed anew each moment — what's constructing it, and for what?"
                    }
                  ]
                },
                {
                  label:"Something like presence",
                  q:"You are most yourself when most here. When is here most real for you?",
                  br:[
                    {
                      label:"In nature",
                      q:"What does natural contact do to the sense of self? What falls away?"
                    },
                    {
                      label:"With certain people",
                      q:"Who draws you into full presence — and what is it about them?"
                    },
                    {
                      label:"Alone, in silence",
                      q:"What arrives in silence that can't come in noise? What have you learned there?"
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          label:"A different self in dreams",
          q:"Which version is more honest — the one that follows rules, or the one that doesn't?",
          br:[
            {
              label:"The dream self is more honest",
              q:"What does the uncensored you want — and is any of it worth listening to?",
              br:[
                {
                  label:"Something I suppress",
                  q:"Is the suppression necessary — or a habit that's outlived its reason?",
                  br:[
                    {
                      label:"Probably necessary",
                      q:"What would one day look like if you stopped suppressing it?"
                    },
                    {
                      label:"An old habit",
                      q:"When did you first learn to suppress it — what were the consequences before?"
                    },
                    {
                      label:"I'm not sure",
                      q:"If you acted on it once, modestly — what's the best realistic outcome?"
                    }
                  ]
                },
                {
                  label:"A freedom I've denied myself",
                  q:"What exactly is the freedom? Not the romantic version — the actual thing.",
                  br:[
                    {
                      label:"To stop needing approval",
                      q:"Whose specifically? When did their opinion become load-bearing for how you live?"
                    },
                    {
                      label:"To live differently",
                      q:"Different how — work, relationships, place? What's the single biggest lever?"
                    },
                    {
                      label:"Something I haven't admitted",
                      q:"What does it feel like in your body when you get close to it?"
                    }
                  ]
                },
                {
                  label:"I'm disturbed by what I dream",
                  q:"Is the disturbance about the content — or what it says you're capable of wanting?",
                  br:[
                    {
                      label:"The content",
                      q:"Where do you think it comes from — fear, memory, desire, or all three?"
                    },
                    {
                      label:"What it says about me",
                      q:"Is that the whole truth about you — or a fragment given too much air?"
                    },
                    {
                      label:"I've made peace with it",
                      q:"How? What allowed you to stop fighting it?"
                    }
                  ]
                }
              ]
            },
            {
              label:"The waking self is more real",
              q:"Freedom and accountability — when have they pulled hardest against each other?",
              br:[
                {
                  label:"At a moral crossroads",
                  q:"What was the choice — and what did it cost to make it?",
                  br:[
                    {
                      label:"I chose the harder thing",
                      q:"What do you carry from it — the pride, or the weight?"
                    },
                    {
                      label:"I chose the easier thing",
                      q:"Do you still carry it? What would genuine peace with it look like?"
                    },
                    {
                      label:"I'm still at it",
                      q:"What's keeping you there? The real thing, not the reason you give."
                    }
                  ]
                },
                {
                  label:"In a close relationship",
                  q:"What do you sacrifice for this relationship that you've never said out loud?",
                  br:[
                    {
                      label:"Parts of myself",
                      q:"Which parts — and do they know those parts exist?"
                    },
                    {
                      label:"Other relationships",
                      q:"Who have you held at arm's length because of a primary relationship?"
                    },
                    {
                      label:"A version of my future",
                      q:"What did you give up — and are you at peace with having given it?"
                    }
                  ]
                },
                {
                  label:"In work",
                  q:"The work self and the authentic self — how close are they?",
                  br:[
                    {
                      label:"Close enough",
                      q:"What would closing the gap entirely require — and is that what you actually want?"
                    },
                    {
                      label:"Further than I'd like",
                      q:"What one change would close it most?"
                    },
                    {
                      label:"I've stopped measuring",
                      q:"When — and was that acceptance or surrender?"
                    }
                  ]
                }
              ]
            },
            {
              label:"Neither is stable",
              q:"If neither version is real — what's performing both?",
              br:[
                {
                  label:"The body",
                  q:"When have you been most aware of yourself as a body — in illness, joy, or stillness?",
                  br:[
                    {
                      label:"In illness",
                      q:"What does bodily vulnerability do to the sense of self? What does it strip away?"
                    },
                    {
                      label:"In physical joy",
                      q:"What body-states make you feel most yourself — and when did you last have them?"
                    },
                    {
                      label:"In stillness",
                      q:"Who are you when nothing is asked of you?"
                    }
                  ]
                },
                {
                  label:"Habit and pattern",
                  q:"If the self is habit — can it be deliberately changed, or does change happen to us?",
                  br:[
                    {
                      label:"Deliberate change is possible",
                      q:"What's the most deliberate change you've made to who you are? How long did it take?"
                    },
                    {
                      label:"Change happens to us",
                      q:"What changed in you that you didn't choose — and which change was strangest to integrate?"
                    },
                    {
                      label:"Both",
                      q:"Between intention and accident, which has shaped you more? Can you actually tell?"
                    }
                  ]
                },
                {
                  label:"Something outside both",
                  q:"The witness that contains both dreaming and waking — what is it to you?",
                  br:[
                    {
                      label:"Consciousness itself",
                      q:"What does raw awareness feel like stripped of content? Have you ever touched it?"
                    },
                    {
                      label:"Something I can't claim",
                      q:"Living without claiming the witness — what does that make possible?"
                    },
                    {
                      label:"I try not to theorize",
                      q:"Staying with the question rather than the answer — what remains when you do that?"
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          label:"No stable me in either",
          q:"If there's no stable self — who is held responsible for what you do?",
          br:[
            {
              label:"Responsibility needs no stable self",
              q:"What grounds accountability then — relationship, habit, or something else?",
              br:[
                {
                  label:"Relationship",
                  q:"Which relationship makes you most accountable to yourself — through care, not fear?",
                  br:[
                    {
                      label:"A person I love",
                      q:"What do they ask of you — spoken or unspoken — that you take seriously?"
                    },
                    {
                      label:"A community",
                      q:"What does belonging ask of you that you'd otherwise let slide?"
                    },
                    {
                      label:"Someone who's gone",
                      q:"Carrying their accountability forward — is that a gift, or also a weight?"
                    }
                  ]
                },
                {
                  label:"Values held over time",
                  q:"Which value do you most reliably return to — even after you've wandered?",
                  br:[
                    {
                      label:"Honesty",
                      q:"Where are you least honest right now — with yourself, or someone else?"
                    },
                    {
                      label:"Care for others",
                      q:"When has your care for others come at the cost of care for yourself — and was it worth it?"
                    },
                    {
                      label:"Integrity",
                      q:"Where is the gap between your stated values and your actual life right now? Name it."
                    }
                  ]
                },
                {
                  label:"Nothing grounds it reliably",
                  q:"Living without reliable moral ground — what does that ask of you daily?",
                  br:[
                    {
                      label:"Constant vigilance",
                      q:"What does it feel like to live that way? What's the toll?"
                    },
                    {
                      label:"Humility",
                      q:"Where has humility been most clarifying — allowing something certainty couldn't?"
                    },
                    {
                      label:"Improvisation",
                      q:"What have you improvised morally that surprised you — and would you do it again?"
                    }
                  ]
                }
              ]
            },
            {
              label:"A fluid self makes me careful",
              q:"Careful with what — the world, or the territory inside yourself?",
              br:[
                {
                  label:"Both",
                  q:"What do you handle with the most care in yourself?",
                  br:[
                    {
                      label:"My anger",
                      q:"What does your anger know that your more reasonable self overlooks?"
                    },
                    {
                      label:"My need for connection",
                      q:"How do you hold that need — at arm's length, or close? What taught you to hold it that way?"
                    },
                    {
                      label:"My capacity to rationalize",
                      q:"What's the best rationalization you've caught yourself making — and what did it nearly cost?"
                    }
                  ]
                },
                {
                  label:"What I say",
                  q:"When has a sentence changed something that couldn't be undone?",
                  br:[
                    {
                      label:"Something I said that hurt",
                      q:"Did you repair it — and what does repair actually look like beyond apology?"
                    },
                    {
                      label:"Something true I said",
                      q:"What is the most important true thing you've said to someone?"
                    },
                    {
                      label:"A silence that mattered",
                      q:"What was the silence holding — and what happened because of it?"
                    }
                  ]
                },
                {
                  label:"Who I'm becoming",
                  q:"If you're mid-construction — who is the architect?",
                  br:[
                    {
                      label:"I am",
                      q:"What are you actually building toward? Not the answer you give — the real one."
                    },
                    {
                      label:"My history is",
                      q:"Which part of your history is most loudly building you right now?"
                    },
                    {
                      label:"I'm not sure anyone is",
                      q:"Drifting versus building — where on that spectrum are you right now?"
                    }
                  ]
                }
              ]
            },
            {
              label:"A fluid self makes me less careful",
              q:"Less careful because no one to answer to — or because fluidity feels like freedom?",
              br:[
                {
                  label:"It feels like freedom",
                  q:"What have you allowed yourself under that freedom that a more fixed version wouldn't have?",
                  br:[
                    {
                      label:"Choices I'm glad I made",
                      q:"What opened up — and is there anything you'd still do differently?"
                    },
                    {
                      label:"Choices I've reckoned with",
                      q:"What did the reckoning look like — and what came through it with you?"
                    },
                    {
                      label:"I'm still in the middle",
                      q:"Where are you in the middle of right now — what hasn't resolved yet?"
                    }
                  ]
                },
                {
                  label:"No one to answer to",
                  q:"Who do you most wish you were accountable to — in the way that raises, not punishes?",
                  br:[
                    {
                      label:"Someone from my past",
                      q:"What would they ask you if they were here — and can you ask it yourself?"
                    },
                    {
                      label:"A future version of me",
                      q:"What would that person most want you to have done — not achieved, but done?"
                    },
                    {
                      label:"I don't have that person",
                      q:"What would finding them — or being that for someone else — require of you?"
                    }
                  ]
                },
                {
                  label:"The question doesn't apply",
                  q:"What question about your relationship to accountability would be more accurate?",
                  br:[
                    {
                      label:"Something about consistency",
                      q:"Where are you least consistent — and does that cost anyone besides you?"
                    },
                    {
                      label:"Something about presence",
                      q:"Where are you absent when you should be present? What pulls you away?"
                    },
                    {
                      label:"I'll ask it myself",
                      q:"Whatever it is — sit with it. What comes when you do?"
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  },
  {
    id:"identity",
    name:"Identity",
    sub:"Who are you?",
    col:"#7A5E9A",
    px:30,
    py:58,
    root:{
      q:"Are you more the person you are when alone — or the person other people see?",
      br:[
        {
          label:"Alone is the real me",
          q:"If who you are alone is truest — why does approval still feel necessary?",
          br:[
            {
              label:"A glitch I want to fix",
              q:"If you could stop needing anyone's opinion — would you? What might be lost?",
              br:[
                {
                  label:"Yes completely",
                  q:"What are you waiting for permission to do or be? Who are you waiting for it from?",
                  br:[
                    {
                      label:"A specific person",
                      q:"What would they have to say for you to finally move? And would it be enough?"
                    },
                    {
                      label:"My own future self",
                      q:"What does that future self know that you don't trust yourself to know now?"
                    },
                    {
                      label:"I don't know who",
                      q:"The permission we wait for is usually invisible. What does it feel like to imagine acting without it?"
                    }
                  ]
                },
                {
                  label:"No — something important would go",
                  q:"What's the version of approval you actually want — and why is it rarer than what you get?",
                  br:[
                    {
                      label:"Being truly understood",
                      q:"Who comes closest? What's the gap — and can it close?"
                    },
                    {
                      label:"Being chosen freely",
                      q:"When has someone chosen you without obligation — and what did that feel like?"
                    },
                    {
                      label:"I'm not sure",
                      q:"What would it feel like to receive approval and actually believe it?"
                    }
                  ]
                },
                {
                  label:"I'd tune it, not remove it",
                  q:"Which opinions still genuinely matter — and how did those people earn that power?",
                  br:[
                    {
                      label:"A few trusted people",
                      q:"What makes their opinion different? Can you describe the quality specifically?"
                    },
                    {
                      label:"My own opinion mostly",
                      q:"How do you tell the difference between genuine assessment and fear dressed as judgment?"
                    },
                    {
                      label:"It shifts over time",
                      q:"What's changed in who you listen to — and does the direction feel right?"
                    }
                  ]
                }
              ]
            },
            {
              label:"Connection requires it",
              q:"When has others' judgment shaped you in a way you're actually grateful for?",
              br:[
                {
                  label:"It corrected a blind spot",
                  q:"What made you able to hear it? What conditions have to be true for feedback to land?",
                  br:[
                    {
                      label:"The person had earned trust",
                      q:"How was that trust built — and are you waiting for it somewhere without building it?"
                    },
                    {
                      label:"I had no choice",
                      q:"Forced correction differs from sought. When have you gone looking for an honest view of yourself?"
                    },
                    {
                      label:"The timing was right",
                      q:"What has to be true internally for you to be able to hear a hard thing?"
                    }
                  ]
                },
                {
                  label:"It's mostly been harmful",
                  q:"What's the most damaging story someone told about you that you believed too long?",
                  br:[
                    {
                      label:"Something about my worth",
                      q:"When did you stop believing it — and what caused the shift?"
                    },
                    {
                      label:"Something about my capacity",
                      q:"Is there still a version of that story running quietly in the background?"
                    },
                    {
                      label:"Still unbelieving it",
                      q:"What would fully releasing it change in your daily life?"
                    }
                  ]
                },
                {
                  label:"I filter carefully",
                  q:"What qualities make someone's opinion worth updating for?",
                  br:[
                    {
                      label:"They know me well",
                      q:"Who knows you best — and do they know what you're most uncertain about in yourself?"
                    },
                    {
                      label:"They have no stake",
                      q:"The honest friend with no agenda — do you have one? When did you last use them?"
                    },
                    {
                      label:"They've been wrong too",
                      q:"Why does shared fallibility make someone more trustworthy to you?"
                    }
                  ]
                }
              ]
            },
            {
              label:"The real me might need witnesses",
              q:"Is it possible you become more yourself in the right company?",
              br:[
                {
                  label:"Yes — certain people draw it out",
                  q:"Who? And are you spending enough time with them?",
                  br:[
                    {
                      label:"Not really",
                      q:"What gets in the way — time, proximity, or something you're not saying?"
                    },
                    {
                      label:"As much as I can",
                      q:"What do those people make possible that others don't? What's the specific quality?"
                    },
                    {
                      label:"That person is gone",
                      q:"What did their presence give you — and is any version of it accessible without them?"
                    }
                  ]
                },
                {
                  label:"I've never felt fully myself anywhere",
                  q:"What would the conditions need to be? Has it ever come close?",
                  br:[
                    {
                      label:"It's come close",
                      q:"What was there — place, people, circumstance? Why can't you get back?"
                    },
                    {
                      label:"Never come close",
                      q:"Is that a wound, or a fact about you? Does the distinction matter?"
                    },
                    {
                      label:"I've stopped looking",
                      q:"When did you stop — and was it acceptance or something quieter?"
                    }
                  ]
                },
                {
                  label:"I feel most real in deep focus",
                  q:"In flow or deep work, is the self quieter — or loudest — in those moments?",
                  br:[
                    {
                      label:"Quieter — it dissolves",
                      q:"What remains when the self gets out of the way? What gets done then?"
                    },
                    {
                      label:"Loudest — most fully me",
                      q:"What is the self expressing then that it can't elsewhere?"
                    },
                    {
                      label:"I can't tell from inside it",
                      q:"What do you notice afterward that's different — body, mood, relationship to others?"
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          label:"Others see something I miss",
          q:"What do people consistently notice about you that you didn't choose — and do you agree?",
          br:[
            {
              label:"They're basically right",
              q:"Does that mean self-knowledge requires community? Can you know yourself without a mirror?",
              br:[
                {
                  label:"No — we need others",
                  q:"Who has reflected you most accurately? What did they see that changed how you understood yourself?",
                  br:[
                    {
                      label:"My strength",
                      q:"Did being seen in that strength change how you used it — or did you minimize it?"
                    },
                    {
                      label:"My vulnerability",
                      q:"Being seen clearly in weakness — what did that require, and what came of it?"
                    },
                    {
                      label:"Something I'd never have named",
                      q:"What did that naming open up for you?"
                    }
                  ]
                },
                {
                  label:"We can know ourselves alone",
                  q:"When have you had a breakthrough about yourself in complete isolation?",
                  br:[
                    {
                      label:"In crisis",
                      q:"Extremity strips things down. What did it show you that comfort had been hiding?"
                    },
                    {
                      label:"In prolonged solitude",
                      q:"What arrived after the noise cleared — what did you find underneath?"
                    },
                    {
                      label:"Through writing or reflection",
                      q:"What did articulating something to yourself make real that experience alone didn't?"
                    }
                  ]
                },
                {
                  label:"It's a back and forth",
                  q:"Which came first for you — better self-knowledge or better mirrors?",
                  br:[
                    {
                      label:"Better mirrors",
                      q:"What made the mirrors better — your ability to choose them, or just luck?"
                    },
                    {
                      label:"Better self-knowledge",
                      q:"What allowed you to use external reflection instead of being ruled by it?"
                    },
                    {
                      label:"They built each other",
                      q:"What's the current state — are they still growing together?"
                    }
                  ]
                }
              ]
            },
            {
              label:"They often get me wrong",
              q:"When your self-image clashes with how others see you — who's right?",
              br:[
                {
                  label:"I am — they project",
                  q:"What's the most persistent misreading you receive — and is there anything you do that invites it?",
                  br:[
                    {
                      label:"Yes — I see the invitation",
                      q:"What would you have to change to stop sending it? And do you want to?"
                    },
                    {
                      label:"No — it's entirely them",
                      q:"Has anyone ever read you accurately in the same domain? What made that possible?"
                    },
                    {
                      label:"I've stopped trying to correct it",
                      q:"What did the effort cost — and what became possible when you let it go?"
                    }
                  ]
                },
                {
                  label:"Sometimes they catch blind spots",
                  q:"What have you learned about yourself that you initially rejected?",
                  br:[
                    {
                      label:"Something I'm proud of now",
                      q:"What changed — did you grow into it, or did you just stop fighting it?"
                    },
                    {
                      label:"Something uncomfortable",
                      q:"Is the uncomfortable truth still running your life — or have you found a way to hold it?"
                    },
                    {
                      label:"The learning is still landing",
                      q:"What does still landing feel like — what's the current state of that integration?"
                    }
                  ]
                },
                {
                  label:"Identity might have no ground truth",
                  q:"If who you are is genuinely contested — whose version do you act from?",
                  br:[
                    {
                      label:"My own, as best I can",
                      q:"What does acting from your own version require you to ignore or discount?"
                    },
                    {
                      label:"It varies by relationship",
                      q:"Is that adaptable — or do you sometimes lose track of which version is actually yours?"
                    },
                    {
                      label:"I'm not sure anymore",
                      q:"That uncertainty — is it disorienting, or does it open something?"
                    }
                  ]
                }
              ]
            },
            {
              label:"I shift depending on the room",
              q:"Is something genuine lost in the shifting — or is fluidity who you are?",
              br:[
                {
                  label:"Something genuine gets lost",
                  q:"What disappears most quickly around other people?",
                  br:[
                    {
                      label:"The version that needs things",
                      q:"You've learned to want nothing visibly. When did that start — what was the first trigger?",
                      br:[
                        {
                          label:"Early loss",
                          q:"What was lost — and did the strategy work? Does it still?"
                        },
                        {
                          label:"Being punished for wanting",
                          q:"What were you punished for wanting? Is that lesson still setting your limits?"
                        },
                        {
                          label:"I'm not sure when",
                          q:"What do you most clearly need right now that you're not letting yourself show?"
                        }
                      ]
                    },
                    {
                      label:"The one that believes things",
                      q:"Which beliefs do you keep private — and why? Protection, or genuine uncertainty?",
                      br:[
                        {
                          label:"Protection",
                          q:"What would expressing the belief risk — and is that risk still real?"
                        },
                        {
                          label:"Uncertainty",
                          q:"Which belief is most genuinely uncertain — and what would it take to find out?"
                        },
                        {
                          label:"Both",
                          q:"What's the belief you're most certain of that you're least willing to say out loud?"
                        }
                      ]
                    },
                    {
                      label:"The one that feels things",
                      q:"What's the emotion you most consistently hide — and who taught you to?",
                      br:[
                        {
                          label:"Sadness",
                          q:"What are you sad about right now? Not in general — something specific, present."
                        },
                        {
                          label:"Longing",
                          q:"What do you long for that you haven't admitted to anyone? Does it embarrass you?"
                        },
                        {
                          label:"Anger",
                          q:"What makes you angrier than you show? What would happen if you showed it?"
                        }
                      ]
                    }
                  ]
                },
                {
                  label:"Fluidity is who I am",
                  q:"What would a settled version of you look like — becoming, or chose not to be?",
                  br:[
                    {
                      label:"Someone I'm becoming",
                      q:"What's the direction? What would you recognize in yourself in ten years?",
                      br:[
                        {
                          label:"More grounded",
                          q:"What does groundedness look like for someone naturally fluid? Can those coexist?"
                        },
                        {
                          label:"Less concerned with others",
                          q:"Is that freedom or isolation? Which do you want more?"
                        },
                        {
                          label:"I don't know yet",
                          q:"What's the first sign you'd notice — the earliest indication you're becoming who you want to be?"
                        }
                      ]
                    },
                    {
                      label:"Someone I chose not to be",
                      q:"What made consistency feel like constriction?",
                      br:[
                        {
                          label:"A specific example I saw",
                          q:"Whose consistency scared you — and is your reading of them accurate?"
                        },
                        {
                          label:"Being forced into a role",
                          q:"What role were you assigned — and how much are you still reacting against it?"
                        },
                        {
                          label:"Something I can't name",
                          q:"What does consistency feel like in your body when you imagine it?"
                        }
                      ]
                    },
                    {
                      label:"I haven't decided",
                      q:"What would it take to make the decision — and do you actually want to?",
                      br:[
                        {
                          label:"I'd need to know myself better",
                          q:"What would knowing yourself better produce — what question would it answer?"
                        },
                        {
                          label:"I'd need circumstances to change",
                          q:"Which circumstances — and how much control do you have over them?"
                        },
                        {
                          label:"I'm not sure the decision is mine",
                          q:"Who or what does it feel like is making that decision for you?"
                        }
                      ]
                    }
                  ]
                },
                {
                  label:"I can't tell from inside",
                  q:"What would you need to see yourself more clearly?",
                  br:[
                    {
                      label:"More solitude",
                      q:"What do you find in solitude that you lose in company — and can you protect it?",
                      br:[
                        {
                          label:"Clarity about what I want",
                          q:"When you're alone and clear about what you want — what is it?"
                        },
                        {
                          label:"A version of myself I like more",
                          q:"What does that person have that the social version doesn't? Is it real or performed?"
                        },
                        {
                          label:"Just quiet",
                          q:"What does the quiet allow that noise doesn't? What is it, specifically?"
                        }
                      ]
                    },
                    {
                      label:"More honest relationships",
                      q:"What would honest relationships require you to risk?",
                      br:[
                        {
                          label:"Being disliked",
                          q:"When has being willing to be disliked resulted in something better? What opened up?"
                        },
                        {
                          label:"Being known",
                          q:"The gap between how you're seen and who you are — is it protective or lonely?"
                        },
                        {
                          label:"Being wrong about myself",
                          q:"What would you most not want to discover if someone knew you completely?"
                        }
                      ]
                    },
                    {
                      label:"Something I haven't tried",
                      q:"What's the experiment that might show you yourself most clearly?",
                      br:[
                        {
                          label:"A radical change",
                          q:"What's the change you've considered that seems too dramatic — and what if it isn't?"
                        },
                        {
                          label:"Sustained honesty",
                          q:"What would change if you committed to saying one true thing per day that you usually don't?"
                        },
                        {
                          label:"I don't know what it is",
                          q:"What would you need to be willing to try in order to find out?"
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  },
  {
    id:"ethics",
    name:"Ethics",
    sub:"What is right?",
    col:"#8A5A5A",
    px:72,
    py:35,
    root:{
      q:"Have you ever done the right thing for the wrong reason — and does the motive actually matter?",
      br:[
        {
          label:"Outcomes are what count",
          q:"If outcomes are everything — would you harm one person to help five? What does your hesitation tell you?",
          br:[
            {
              label:"I'd do it",
              q:"What's the hardest price you've actually paid for doing what you believed was right?",
              br:[
                {
                  label:"A relationship",
                  q:"Did the loss confirm you were right — or make you doubt the decision?",
                  br:[
                    {
                      label:"It confirmed me",
                      q:"How do you carry the cost — with pride, or something more complicated?"
                    },
                    {
                      label:"It made me doubt",
                      q:"What would you do differently — not the choice itself, but how you held the aftermath?"
                    },
                    {
                      label:"Both at different times",
                      q:"What determines which — proximity in time, or the state of the relationship now?"
                    }
                  ]
                },
                {
                  label:"Part of myself",
                  q:"Which part — and is it still gone, or did it return differently?",
                  br:[
                    {
                      label:"It's still gone",
                      q:"What would it take to recover it — and is that still possible?"
                    },
                    {
                      label:"It returned changed",
                      q:"What's different about the version that came back?"
                    },
                    {
                      label:"I'm not sure",
                      q:"How do you function without knowing whether that part of you is still there?"
                    }
                  ]
                },
                {
                  label:"Something unresolved",
                  q:"What would resolution look like — and is resolution actually what you want?",
                  br:[
                    {
                      label:"Resolution would help",
                      q:"What needs to close — an apology, an acknowledgment, an acceptance?"
                    },
                    {
                      label:"I'm not sure I want resolution",
                      q:"What does keeping it unresolved do for you? Is it a form of vigilance?"
                    },
                    {
                      label:"Resolution doesn't exist here",
                      q:"What do you do with a cost that can't be resolved — how do you hold it?"
                    }
                  ]
                }
              ]
            },
            {
              label:"I wouldn't — there are limits",
              q:"What principle are you protecting? Is it about rights, or who you're allowed to become?",
              br:[
                {
                  label:"A belief about rights",
                  q:"Rights need grounding. Where do yours come from — and could you lose them in a careful argument?",
                  br:[
                    {
                      label:"From a tradition or faith",
                      q:"How does that source hold up when it conflicts with your immediate moral sense?"
                    },
                    {
                      label:"From reason",
                      q:"Has reason ever led you to a conclusion that felt wrong? Did you follow it?"
                    },
                    {
                      label:"Something inarticulate",
                      q:"That inarticulate sense — do you trust it? Or fear it's just conditioning?"
                    }
                  ]
                },
                {
                  label:"Who I'm allowed to become",
                  q:"If wrong acts for right reasons corrupt slowly — what are the earliest signs in yourself?",
                  br:[
                    {
                      label:"I've noticed them",
                      q:"What's the sign you're most vigilant about — what tells you you're drifting?"
                    },
                    {
                      label:"I watch for them",
                      q:"What does watching for your own corruption require of your daily life?"
                    },
                    {
                      label:"I don't think I'm susceptible",
                      q:"That confidence — is it wisdom, or the most dangerous form of the thing itself?"
                    }
                  ]
                },
                {
                  label:"I just couldn't live with it",
                  q:"Is that ethics or psychology — and is there a meaningful difference?",
                  br:[
                    {
                      label:"There's a difference",
                      q:"Where does the line fall — can you give an example from your own life?"
                    },
                    {
                      label:"It's all psychology",
                      q:"If moral limits are psychological — what does that mean for their authority?"
                    },
                    {
                      label:"The distinction doesn't help",
                      q:"What would actually help you when you face a genuinely hard choice?"
                    }
                  ]
                }
              ]
            },
            {
              label:"The hesitation is the point",
              q:"Moral hesitation — wisdom, or discomfort dressed as ethics?",
              br:[
                {
                  label:"Usually wisdom",
                  q:"What's the clearest example of hesitation leading somewhere better than speed would have?",
                  br:[
                    {
                      label:"A decision I didn't make",
                      q:"What would you have done without the pause — and where would it have landed?"
                    },
                    {
                      label:"A conversation I waited for",
                      q:"What did waiting make possible that urgency would have closed off?"
                    },
                    {
                      label:"I can't point to an example",
                      q:"Is the absence of examples evidence, or that the times it helped were invisible?"
                    }
                  ]
                },
                {
                  label:"Sometimes cowardice",
                  q:"When have you hesitated not from scruple but from difficulty — can you tell which is which?",
                  br:[
                    {
                      label:"I can usually tell",
                      q:"What's the difference feel like from inside — what distinguishes the two in your body?"
                    },
                    {
                      label:"It's genuinely hard to tell",
                      q:"What do you do when you can't tell? How do you decide anyway?"
                    },
                    {
                      label:"I lean on it too much",
                      q:"What has over-hesitating cost you? What didn't happen because you waited?"
                    }
                  ]
                },
                {
                  label:"I can't always tell",
                  q:"Is that inability a problem to solve — or just an honest condition of moral life?",
                  br:[
                    {
                      label:"A problem to work on",
                      q:"What would better moral discernment look like for you specifically?"
                    },
                    {
                      label:"An honest condition",
                      q:"What do you do with hard choices when you genuinely can't tell what's right?"
                    },
                    {
                      label:"Something in between",
                      q:"When has accepting the ambiguity been the wiser move than forcing clarity?"
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          label:"Motive matters",
          q:"Does impure intention corrupt a good act — or only matter for who you're becoming?",
          br:[
            {
              label:"It's about character",
              q:"Name the version of yourself you're working to avoid. What do they look like day to day?",
              br:[
                {
                  label:"Someone who rationalizes",
                  q:"What's a rationalization you made recently — while knowing it was one?",
                  br:[
                    {
                      label:"About someone I hurt",
                      q:"What would owning it fully — without the rationalization — actually look like?"
                    },
                    {
                      label:"About something I didn't do",
                      q:"What would you have had to face if you'd acted differently?"
                    },
                    {
                      label:"I'm still making it",
                      q:"What would it take to stop — what's the first move?"
                    }
                  ]
                },
                {
                  label:"Someone who becomes numb",
                  q:"What have you become less troubled by that you used to notice?",
                  br:[
                    {
                      label:"Others' pain",
                      q:"Was the numbing self-protection or just exposure? Does the distinction matter?"
                    },
                    {
                      label:"My own small failures",
                      q:"Is not being troubled by small failures growth — or lowering the bar?"
                    },
                    {
                      label:"Things I can't change",
                      q:"Acceptance versus numbness — how do you tell which yours is?"
                    }
                  ]
                },
                {
                  label:"Someone who gives up on people",
                  q:"Which relationship has most tested your capacity to believe in someone?",
                  br:[
                    {
                      label:"I'm still in it",
                      q:"What keeps you — is it love, obligation, hope, or something you haven't named?"
                    },
                    {
                      label:"I gave up, and I'm reckoning",
                      q:"What would have been required to stay — and did you have it to give?"
                    },
                    {
                      label:"I held on and it changed",
                      q:"What changed — them, you, or just how you were holding it?"
                    }
                  ]
                }
              ]
            },
            {
              label:"It's about effects on the world",
              q:"If no one would ever know and outcomes were identical — would you still try to be good?",
              br:[
                {
                  label:"Honestly, sometimes no",
                  q:"What's the thing you do for others that you'd let slide if unobserved?",
                  br:[
                    {
                      label:"Something small",
                      q:"Small unobserved choices — do they accumulate? Are they shaping you?"
                    },
                    {
                      label:"Something significant",
                      q:"What does that tell you about what the behavior is actually for?"
                    },
                    {
                      label:"I'd rather not say",
                      q:"The fact that it's uncomfortable to say — what is that discomfort about?"
                    }
                  ]
                },
                {
                  label:"Yes — it feels intrinsic",
                  q:"Where does that pull come from — love, habit, fear, or something you can't name?",
                  br:[
                    {
                      label:"Love",
                      q:"Love of what — people, life, an idea of the good? What specifically is the object?"
                    },
                    {
                      label:"Habit built over time",
                      q:"What originally built the habit — was it chosen, or did it arrive through circumstance?"
                    },
                    {
                      label:"Something I can't name",
                      q:"What happens when you try to name it? What gets close and what falls away?"
                    }
                  ]
                },
                {
                  label:"I want to say yes but I'm uncertain",
                  q:"The gap between who you want to be and who you are unobserved — does it embarrass or motivate?",
                  br:[
                    {
                      label:"Embarrass",
                      q:"What specifically — the gap itself, or what it implies about your actual values?"
                    },
                    {
                      label:"Motivate",
                      q:"What have you changed because of noticing that gap? What's still to change?"
                    },
                    {
                      label:"Both in cycles",
                      q:"What triggers the shift from one to the other?"
                    }
                  ]
                }
              ]
            },
            {
              label:"I can't trace my own motives",
              q:"Where does your sense of right actually come from?",
              br:[
                {
                  label:"Mostly instinct",
                  q:"Moral instinct has enabled atrocities. How do you tell genuine instinct from inherited habit?",
                  br:[
                    {
                      label:"I test it against consequences",
                      q:"When has that testing led you away from your instinct — were you right?"
                    },
                    {
                      label:"I test it against others' wellbeing",
                      q:"Whose wellbeing is the test — and have you chosen that person well?"
                    },
                    {
                      label:"I'm not sure I can tell",
                      q:"What would you do with a strong moral instinct you couldn't justify?"
                    }
                  ]
                },
                {
                  label:"Mostly logic",
                  q:"Has reasoning ever led you to a conclusion that felt deeply wrong? Did you follow it?",
                  br:[
                    {
                      label:"Yes, and I followed it",
                      q:"Do you stand by that — and what did you learn about the limits of reasoning?"
                    },
                    {
                      label:"Yes, and I didn't follow it",
                      q:"What did you follow instead — and was it the right call?"
                    },
                    {
                      label:"Logic and feeling mostly align",
                      q:"Is that integration — or have you just never been seriously tested by the gap?"
                    }
                  ]
                },
                {
                  label:"Something inarticulate",
                  q:"That inarticulate sense — do you trust it? Or worry it's conditioning dressed as wisdom?",
                  br:[
                    {
                      label:"I trust it",
                      q:"When has it been clearly right in a way logic couldn't get you to?"
                    },
                    {
                      label:"I'm suspicious of it",
                      q:"What would you have to trust in yourself to trust it?"
                    },
                    {
                      label:"Both depending on situation",
                      q:"What makes the difference — which situations call for which kind of knowing?"
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          label:"I'm not sure I ever know what's right",
          q:"Is moral action just what you can survive defending — or is there something beyond justification?",
          br:[
            {
              label:"Something beyond justification",
              q:"Where would that come from? And does believing in it change how you actually act?",
              br:[
                {
                  label:"A religious or spiritual source",
                  q:"How does it show up in real decisions — not comfortable ones, ones that cost something?",
                  br:[
                    {
                      label:"It holds me to account",
                      q:"When has it demanded something you didn't want to give?"
                    },
                    {
                      label:"It gives me courage",
                      q:"Courage for what specifically — is there something it's enabling right now?"
                    },
                    {
                      label:"I'm not sure it changes behavior",
                      q:"Is that a crisis of faith — or a sign the source is working at a deeper level?"
                    }
                  ]
                },
                {
                  label:"Something like natural law",
                  q:"What do you think is genuinely universal about human moral life?",
                  br:[
                    {
                      label:"The wrongness of cruelty",
                      q:"How do you hold that alongside the fact that most cruelty is committed by people who don't believe they're cruel?"
                    },
                    {
                      label:"The value of each person",
                      q:"Does that value ever compete with other values — and how do you resolve it?"
                    },
                    {
                      label:"I'm not sure anything is universal",
                      q:"If nothing is universal, what grounds your moral life — what gives your convictions weight?"
                    }
                  ]
                },
                {
                  label:"I act as if truth exists",
                  q:"That's a bet. What are you betting — and what would change your wager?",
                  br:[
                    {
                      label:"Consistent evidence against it",
                      q:"What would that evidence look like — and have you encountered it?"
                    },
                    {
                      label:"A more compelling framework",
                      q:"What framework have you seriously considered and rejected? What did it get wrong?"
                    },
                    {
                      label:"Probably nothing — it's load-bearing",
                      q:"What does the bet support in your life — what falls if you drop it?"
                    }
                  ]
                }
              ]
            },
            {
              label:"Justification is all I have",
              q:"Who are you justifying to — yourself, others, or an imagined ideal?",
              br:[
                {
                  label:"Myself",
                  q:"Is that a high bar or a low one? When have you accepted a justification you later recognized as lazy?",
                  br:[
                    {
                      label:"Recently",
                      q:"What made it visible — time, consequence, or someone else seeing it?"
                    },
                    {
                      label:"In an important relationship",
                      q:"What happened — and did you repair it, or just move on?"
                    },
                    {
                      label:"I try to catch them early",
                      q:"What does catching them early require of you? What's the practice?"
                    }
                  ]
                },
                {
                  label:"An imagined ideal",
                  q:"Who is that person? What would they think of a decision you're not at peace with?",
                  br:[
                    {
                      label:"They'd understand",
                      q:"Does that mean you've made peace — or the ideal is too forgiving?"
                    },
                    {
                      label:"They'd be disappointed",
                      q:"Can you hold that disappointment without it becoming punishment?"
                    },
                    {
                      label:"I'm not sure they exist anymore",
                      q:"What happened to the ideal — and what replaced it?"
                    }
                  ]
                },
                {
                  label:"It varies and that bothers me",
                  q:"Is moral inconsistency immaturity — or honesty about how complex ethical life is?",
                  br:[
                    {
                      label:"Immaturity I'm working on",
                      q:"What would consistency require — a clearer framework, or something harder?"
                    },
                    {
                      label:"Honest acknowledgment of complexity",
                      q:"Where does the complexity feel most honest — and where does it feel like cover?"
                    },
                    {
                      label:"I hold both",
                      q:"What's the version of inconsistency you're most willing to own?"
                    }
                  ]
                }
              ]
            },
            {
              label:"Morality is mostly social",
              q:"If morality is social — what happens when the group is wrong?",
              br:[
                {
                  label:"Those outside can correct it",
                  q:"When have you been the insider who needed an outside view to see clearly?",
                  br:[
                    {
                      label:"In a community I loved",
                      q:"What was it like to stay and push for change — or to leave? Which required more?"
                    },
                    {
                      label:"In a family",
                      q:"Family loyalty and moral clarity — when have those pulled hardest against each other?"
                    },
                    {
                      label:"In my own beliefs",
                      q:"What outside view most usefully disrupted something you believed? What made you able to receive it?"
                    }
                  ]
                },
                {
                  label:"Moral progress is real",
                  q:"What does your society believe now that future generations will judge harshly — and are you acting on that?",
                  br:[
                    {
                      label:"Yes actively",
                      q:"What does acting on it cost you — socially, financially, in relationships?"
                    },
                    {
                      label:"I believe it but don't act",
                      q:"What's in the gap — and is it honest to call it belief if it changes nothing?"
                    },
                    {
                      label:"I'm not sure what I believe",
                      q:"What would it take to form a view you could actually act from?"
                    }
                  ]
                },
                {
                  label:"I'm skeptical of moral progress",
                  q:"Is that skepticism wisdom or comfort — and what would you change if progress turned out to be real and demanding?",
                  br:[
                    {
                      label:"I'd change how I live",
                      q:"What specifically — and what prevents you under uncertainty?"
                    },
                    {
                      label:"Not much probably",
                      q:"Is that because you're already living by your best sense of right — or is the skepticism doing work for you?"
                    },
                    {
                      label:"I genuinely don't know",
                      q:"What would you need to find out — and are you willing to look?"
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  },
  {
    id:"time",
    name:"Time",
    sub:"What endures?",
    col:"#4A7A8A",
    px:55,
    py:75,
    root:{
      q:"Would you rather remember a perfect day perfectly — or relive it knowing you'd forget it entirely afterward?",
      br:[
        {
          label:"Remember it perfectly",
          q:"What's the most meaningful experience you've had that you can barely recall now?",
          br:[
            {
              label:"A relationship that changed",
              q:"What do you carry from it — objects, habits, the way you now approach something?",
              br:[
                {
                  label:"A habit they gave me",
                  q:"Would you consciously choose it now — or is the other person still running quietly inside you?",
                  br:[
                    {
                      label:"I'd choose it",
                      q:"Choosing to keep what someone gave you — is that continuity or tribute? Does the distinction matter?"
                    },
                    {
                      label:"I'm not sure I'd choose it",
                      q:"What would it take to examine whether to keep it — and what might you need to release?"
                    },
                    {
                      label:"They're still running inside me",
                      q:"What would it mean to fully integrate what they gave — to make it yours?"
                    }
                  ]
                },
                {
                  label:"The way I approach something",
                  q:"Which approach — and is it serving you, or just familiar?",
                  br:[
                    {
                      label:"Serving me well",
                      q:"Do you know that, or is it that you've never questioned it?"
                    },
                    {
                      label:"Just familiar",
                      q:"What would examining it require — and what might you find?"
                    },
                    {
                      label:"I'm not sure yet",
                      q:"How would you know, one way or the other?"
                    }
                  ]
                },
                {
                  label:"I'm not sure what I carry",
                  q:"Is not carrying anything from it freedom — or a kind of loss?",
                  br:[
                    {
                      label:"Freedom",
                      q:"What did you need to let go of — and how did you manage to?"
                    },
                    {
                      label:"Loss",
                      q:"What would you want to have held onto? Is any of it still accessible?"
                    },
                    {
                      label:"I haven't decided yet",
                      q:"What would be the most honest thing to carry forward from it?"
                    }
                  ]
                }
              ]
            },
            {
              label:"A moment of clarity",
              q:"What did it show you — and how long before ordinary life covered it back over?",
              br:[
                {
                  label:"It changed something permanently",
                  q:"What changed — and how do you protect that change from erosion?",
                  br:[
                    {
                      label:"How I relate to a person",
                      q:"What was before — and is the after better, or just different?"
                    },
                    {
                      label:"What I want from my life",
                      q:"Has the change held — or is it still a horizon rather than a floor?"
                    },
                    {
                      label:"What I believe",
                      q:"Belief that arrives through direct experience — is it more stable than belief through reasoning?"
                    }
                  ]
                },
                {
                  label:"It faded faster than I expected",
                  q:"What would it take to get back there — and is it the same place once you've named it?",
                  br:[
                    {
                      label:"I've tried to return",
                      q:"What was different the second time — better, worse, or just different?"
                    },
                    {
                      label:"I haven't tried",
                      q:"What stops you — logistics, or a worry about what you'd find?"
                    },
                    {
                      label:"You can't go back",
                      q:"If the clarity was a one-time door — what does that mean for how you hold it?"
                    }
                  ]
                },
                {
                  label:"I'm still living inside it",
                  q:"What is it like to be in a sustained moment of clarity?",
                  br:[
                    {
                      label:"Simpler than before",
                      q:"What fell away — and is any part of you mourning what you simplified?"
                    },
                    {
                      label:"More demanding",
                      q:"Clarity without peace — is that a cost, or the right relationship to what you see?"
                    },
                    {
                      label:"Harder to explain to others",
                      q:"What's untranslatable — and do you need it to be?"
                    }
                  ]
                }
              ]
            },
            {
              label:"Something significant I can't explain",
              q:"The body stores what the mind can't hold. What does that moment feel like when you try?",
              br:[
                {
                  label:"Warmth",
                  q:"Where in your present life does that feeling exist — even partially?",
                  br:[
                    {
                      label:"In a relationship",
                      q:"Is that warmth something you protect, or do you let it be visible?"
                    },
                    {
                      label:"Rarely anywhere",
                      q:"What would it take to build more of it — not as a goal, but as a daily texture?"
                    },
                    {
                      label:"I'm not sure",
                      q:"The last time you felt that — what was happening? Can you name the conditions?"
                    }
                  ]
                },
                {
                  label:"Incompleteness",
                  q:"Is the incompleteness in the memory — or in something it pointed toward that never arrived?",
                  br:[
                    {
                      label:"In the memory",
                      q:"What does it feel like to have an experience you can't quite reach anymore?"
                    },
                    {
                      label:"In what it pointed toward",
                      q:"What was being pointed toward — and do you still want it?"
                    },
                    {
                      label:"Both",
                      q:"How do you live with an incompleteness that's in two places at once?"
                    }
                  ]
                },
                {
                  label:"I can't access the feeling anymore",
                  q:"What's the most important emotional register you've lost touch with?",
                  br:[
                    {
                      label:"Wonder",
                      q:"When did wonder become harder — and what was happening in your life at that time?"
                    },
                    {
                      label:"Grief",
                      q:"Not feeling grief — is that healing, or has something been sealed off?"
                    },
                    {
                      label:"Ease",
                      q:"What would it mean to let yourself be at ease — not performing calm, but genuinely easy?"
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          label:"Relive it — presence over record",
          q:"What in your current life are you not fully present for — and do you know why?",
          br:[
            {
              label:"I know exactly what I'm missing",
              q:"Knowing and not changing is its own decision. What would actually change it?",
              br:[
                {
                  label:"A structural shift",
                  q:"What's the smallest structural change with the biggest impact on your presence?",
                  br:[
                    {
                      label:"Something with time",
                      q:"What would you protect or cut — and what's the real reason it hasn't happened?"
                    },
                    {
                      label:"Something with relationships",
                      q:"Which relationship is asking you to be present in a way you're not meeting?"
                    },
                    {
                      label:"Something with my habits",
                      q:"What habit takes you away most — and what does it give you that you'd have to find elsewhere?"
                    }
                  ]
                },
                {
                  label:"Less fear",
                  q:"Fear of what — losing control, things going wrong, or something harder to name?",
                  br:[
                    {
                      label:"Losing control",
                      q:"What does control protect you from feeling? Is that protection still necessary?"
                    },
                    {
                      label:"Something harder to name",
                      q:"Sit with it. What shape would the fear have, if it had one?"
                    },
                    {
                      label:"Being present for something painful",
                      q:"What has avoidance cost you that you've actually noticed?"
                    }
                  ]
                },
                {
                  label:"I don't know — knowing isn't enough",
                  q:"What have you understood for years that you still haven't acted on?",
                  br:[
                    {
                      label:"It's not a knowledge problem",
                      q:"What kind of problem is it — will, fear, structure, or something else?"
                    },
                    {
                      label:"Something is in the way I haven't named",
                      q:"What would you have to look at to find out what's in the way?"
                    },
                    {
                      label:"Maybe I've accepted it",
                      q:"Is acceptance the right word — or has the understanding just lost its edge?"
                    }
                  ]
                }
              ]
            },
            {
              label:"Something I haven't identified",
              q:"The things we miss most are invisible until they're gone. What might you grieve for not noticing?",
              br:[
                {
                  label:"A relationship I'm still in",
                  q:"If this became much harder to access in five years — what would you do differently starting now?",
                  br:[
                    {
                      label:"Show up differently",
                      q:"How specifically — what would the different version of you do on an ordinary day?"
                    },
                    {
                      label:"Say things I haven't said",
                      q:"What specifically? What's the closest you can get to saying it right now?"
                    },
                    {
                      label:"Just be more present",
                      q:"What does that require — what has to quiet, or stop, for you to actually be there?"
                    }
                  ]
                },
                {
                  label:"A phase I'm already leaving",
                  q:"Can you feel the edge of this era? What does it feel like from inside?",
                  br:[
                    {
                      label:"Sad",
                      q:"What are you losing — and is there anything you can do to mark the loss properly?"
                    },
                    {
                      label:"Ready",
                      q:"What's driving the readiness — and is anything being left behind that you'd carry forward?"
                    },
                    {
                      label:"Not quite real yet",
                      q:"When does a transition become real for you — the moment of change, or later?"
                    }
                  ]
                },
                {
                  label:"My own body",
                  q:"What is your body doing right now that you're not acknowledging?",
                  br:[
                    {
                      label:"Aging slowly",
                      q:"What relationship are you in with your body's change — at peace, at war, or somewhere in between?"
                    },
                    {
                      label:"Carrying something",
                      q:"What is your body holding that you haven't let yourself consciously know?"
                    },
                    {
                      label:"It's fine",
                      q:"Is that true — or is fine a word that stops you from looking?"
                    }
                  ]
                }
              ]
            },
            {
              label:"Presence doesn't come naturally to me",
              q:"When have you surprised yourself by being more present than expected?",
              br:[
                {
                  label:"In a crisis",
                  q:"Crises collapse everything to the present. What does that tell you about where your attention normally lives?",
                  br:[
                    {
                      label:"In the past",
                      q:"Is living in the past functional — what does it organize or protect?"
                    },
                    {
                      label:"In the future",
                      q:"The future-orientation — what's it preparing you for? Has the preparation been proportionate?"
                    },
                    {
                      label:"Everywhere except here",
                      q:"What would being here cost — what would you have to feel or face?"
                    }
                  ]
                },
                {
                  label:"In love or deep connection",
                  q:"What is it about real connection that collapses time the way crisis does?",
                  br:[
                    {
                      label:"The stakes feel real",
                      q:"What makes stakes feel real in everyday life — and can you cultivate that?"
                    },
                    {
                      label:"I can't be elsewhere when truly seen",
                      q:"What does being truly seen do to your relationship with time?"
                    },
                    {
                      label:"I don't know — it just happens",
                      q:"What happens to the self-consciousness in those moments? Where does it go?"
                    }
                  ]
                },
                {
                  label:"I genuinely can't think of a time",
                  q:"What would you need for that to become possible?",
                  br:[
                    {
                      label:"Safety",
                      q:"Safety from what — judgment, overwhelm, or something you haven't named?"
                    },
                    {
                      label:"Less going on",
                      q:"Is that realistic — or is the density of life a constant you have to work with?"
                    },
                    {
                      label:"I'm not sure it's possible for me",
                      q:"Is that a conclusion from evidence — or a story that has gotten very comfortable?"
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          label:"They're inseparable for me",
          q:"Was the question really about whether the self accumulates — or simply moves through?",
          br:[
            {
              label:"The self accumulates",
              q:"Selective memory makes us. What's something you've revised in your own story?",
              br:[
                {
                  label:"A story about my family",
                  q:"What would the others in that story say? Does your version protect you — or cost you?",
                  br:[
                    {
                      label:"Protect me",
                      q:"From what specifically — is the protection still necessary?"
                    },
                    {
                      label:"Cost me",
                      q:"What's the cost — and do you know you're paying it?"
                    },
                    {
                      label:"Both",
                      q:"How do you hold a story that does both at once?"
                    }
                  ]
                },
                {
                  label:"A story about a failure",
                  q:"Did you make yourself the hero of your own defeat — or the villain?",
                  br:[
                    {
                      label:"The hero",
                      q:"What did heroism of failure allow — and is it accurate?"
                    },
                    {
                      label:"The villain",
                      q:"Self-blame versus accurate accounting — can you tell which yours is?"
                    },
                    {
                      label:"I've tried to stay accurate",
                      q:"How do you maintain accuracy about your own history? What's the practice?"
                    }
                  ]
                },
                {
                  label:"A story about who I am",
                  q:"How has the revision changed how you live?",
                  br:[
                    {
                      label:"It's freed me",
                      q:"From what — and is the freedom complete, or still arriving?"
                    },
                    {
                      label:"It's required more of me",
                      q:"What does the more accurate story demand that the old one didn't?"
                    },
                    {
                      label:"I'm still inside the revision",
                      q:"What does living inside an ongoing revision feel like?"
                    }
                  ]
                }
              ]
            },
            {
              label:"The self moves through — now is all there is",
              q:"If now is what matters — literally today — what are you doing with it?",
              br:[
                {
                  label:"More than I'd have admitted a year ago",
                  q:"What changed — did something happen, or did you choose it deliberately?",
                  br:[
                    {
                      label:"Something happened",
                      q:"What was it — and what specifically did it clarify?"
                    },
                    {
                      label:"I chose it",
                      q:"What made the choice possible — what were you ready for that you hadn't been before?"
                    },
                    {
                      label:"A combination",
                      q:"Which was the door, and which was you walking through it?"
                    }
                  ]
                },
                {
                  label:"Less than I'd like",
                  q:"What would a stranger conclude you value most, looking at how you spent the last seven days?",
                  br:[
                    {
                      label:"Things I don't actually value most",
                      q:"How did that gap form — gradually, or was there a specific moment?"
                    },
                    {
                      label:"Things hard to value differently",
                      q:"What would have to change for the outer life to reflect the inner one?"
                    },
                    {
                      label:"I can't look at that directly",
                      q:"What does the oblique angle protect you from?"
                    }
                  ]
                },
                {
                  label:"I'm not sure how to answer honestly",
                  q:"Is the difficulty because the question is hard — or because the honest answer is uncomfortable?",
                  br:[
                    {
                      label:"The question is hard",
                      q:"What would make it easier — more time, more honesty, or just looking?"
                    },
                    {
                      label:"The answer is uncomfortable",
                      q:"What specifically — and what would change if you sat with it?"
                    },
                    {
                      label:"Both",
                      q:"Which part of the discomfort is information — and which is just weather?"
                    }
                  ]
                }
              ]
            },
            {
              label:"I hold both",
              q:"What has holding that tension actually produced in your life?",
              br:[
                {
                  label:"Creative work",
                  q:"What have you made that required holding two opposing things at once?",
                  br:[
                    {
                      label:"Something I'm proud of",
                      q:"What did the tension contribute — what would the work have been without it?"
                    },
                    {
                      label:"Something unfinished",
                      q:"What keeps it from finishing — the tension itself, or something else?"
                    },
                    {
                      label:"I'm still finding out",
                      q:"What is the creative work revealing about the tension as it develops?"
                    }
                  ]
                },
                {
                  label:"Deeper relationships",
                  q:"How does holding contradiction help you be with other people?",
                  br:[
                    {
                      label:"It makes me more patient",
                      q:"Patient with what — their contradictions, their timing, their changes?"
                    },
                    {
                      label:"It makes me less demanding",
                      q:"What does holding your own contradiction teach you about making demands of others?"
                    },
                    {
                      label:"I'm not sure how it connects",
                      q:"What's the relationship between your inner life and your capacity for relationship?"
                    }
                  ]
                },
                {
                  label:"Mostly just tension",
                  q:"Is the tension productive or depleting — and have you ever resolved a version of it?",
                  br:[
                    {
                      label:"Productive mostly",
                      q:"What does it produce that resolution couldn't — what's only possible inside the tension?"
                    },
                    {
                      label:"Depleting",
                      q:"What would resolution cost — what would you have to let go of?"
                    },
                    {
                      label:"I've resolved parts of it",
                      q:"What made resolution possible — what had to shift for it to become available?"
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  },
  {
    id:"desire",
    name:"Desire",
    sub:"What do you want?",
    col:"#A05870",
    px:82,
    py:42,
    root:{
      q:"When was the last time you wanted something purely — with no justification, no audience, just the wanting?",
      br:[
        {
          label:"I remember it clearly",
          q:"What was it — and what did you do with the wanting?",
          br:[
            {
              label:"I pursued it",
              q:"What happened when you followed it without justification?",
              br:[
                {
                  label:"It gave me what I wanted",
                  q:"Why isn't your life more full of that — what gets in the way of undiluted wanting?",
                  br:[
                    {
                      label:"What other people need from me",
                      q:"Is that real obligation or assumed — and who decided you had to carry it?"
                    },
                    {
                      label:"What I've told myself I should want",
                      q:"When did the should arrive — and whose voice is it in?"
                    },
                    {
                      label:"I'm not sure",
                      q:"What would one week of undiluted wanting actually look like? Not forever — one week."
                    }
                  ]
                },
                {
                  label:"It gave me something unexpected",
                  q:"Better or worse than what you wanted — and what did the unexpected thing teach you?",
                  br:[
                    {
                      label:"Better",
                      q:"Does that change how you trust your own wanting — or was it a one-time thing?"
                    },
                    {
                      label:"Worse",
                      q:"Did that make you warier of wanting — and has the wariness been proportionate?"
                    },
                    {
                      label:"Just different",
                      q:"What does the difference between what you wanted and what you got tell you about what you actually want?"
                    }
                  ]
                },
                {
                  label:"It didn't fully satisfy",
                  q:"Is desire ever fully satisfied — or does getting what you want just change the shape of wanting?",
                  br:[
                    {
                      label:"The shape changes — it's endless",
                      q:"Does that feel like a gift or a curse? What does it mean for how you pursue things?"
                    },
                    {
                      label:"Some things do satisfy",
                      q:"What have you wanted and received that actually landed? What was different about it?"
                    },
                    {
                      label:"I'm not sure satisfaction is the point",
                      q:"What is the point then — what is desire for?"
                    }
                  ]
                }
              ]
            },
            {
              label:"I set it aside",
              q:"What made you set it aside — shame, practicality, or something harder to name?",
              br:[
                {
                  label:"Shame",
                  q:"Who was the original voice behind that shame — and is it still accurate?",
                  br:[
                    {
                      label:"Someone specific",
                      q:"What would they think of you now — and does their opinion still deserve that power?"
                    },
                    {
                      label:"A culture or set of expectations",
                      q:"When did you absorb it — and when did you last question whether it fits?"
                    },
                    {
                      label:"I'm not sure where it came from",
                      q:"What does the shame feel like in your body? Where does it live?"
                    }
                  ]
                },
                {
                  label:"Practicality",
                  q:"How much of your life has practicality shaped at the expense of desire — and is that ratio what you'd choose?",
                  br:[
                    {
                      label:"More than I'd choose",
                      q:"What would rebalancing look like — and what's the smallest move toward it?"
                    },
                    {
                      label:"About right",
                      q:"Is practical life actually satisfying — or is practicality the story that makes sacrifice bearable?"
                    },
                    {
                      label:"I've stopped counting",
                      q:"When did you stop — and was it acceptance or resignation?"
                    }
                  ]
                },
                {
                  label:"Something I can't name",
                  q:"What does the not-naming protect — the desire, or you from having to claim it?",
                  br:[
                    {
                      label:"The desire",
                      q:"From what would it protect the desire?"
                    },
                    {
                      label:"Me from claiming it",
                      q:"What would claiming it require — what would you have to own?"
                    },
                    {
                      label:"I'm not sure",
                      q:"What would happen if you named it anyway — imperfectly, approximately?"
                    }
                  ]
                }
              ]
            },
            {
              label:"I still haven't acted",
              q:"What keeps it alive despite not acting — and what would finally moving cost?",
              br:[
                {
                  label:"Fear of what it means about me",
                  q:"What does it say about you — is that the most accurate reading, or the most frightening?",
                  br:[
                    {
                      label:"Probably the most accurate",
                      q:"Can you hold that truth and still want the thing? What does wanting it despite that mean?"
                    },
                    {
                      label:"The most frightening one",
                      q:"What's a kinder or more accurate reading — one that still takes you seriously?"
                    },
                    {
                      label:"I can't tell",
                      q:"Who would you trust to tell you which is closer to the truth?"
                    }
                  ]
                },
                {
                  label:"Timing never feels right",
                  q:"Has timing ever felt right for anything important — or is right-timing a story?",
                  br:[
                    {
                      label:"It has felt right before",
                      q:"What made those moments different? Can you manufacture any of those conditions?"
                    },
                    {
                      label:"I think it's a story",
                      q:"What are you actually waiting for, if not timing?"
                    },
                    {
                      label:"Timing matters for this",
                      q:"What specifically needs to align — and what's your honest estimate of when it will?"
                    }
                  ]
                },
                {
                  label:"I don't trust the wanting",
                  q:"Which wants do you trust — and how did they earn that trust?",
                  br:[
                    {
                      label:"Wants that serve others too",
                      q:"Is that a sound principle or a way of not trusting any want that's purely yours?"
                    },
                    {
                      label:"Wants I've held a long time",
                      q:"How long is this one? Long enough?"
                    },
                    {
                      label:"I'm not sure I trust any wants",
                      q:"What would it take to trust at least one?"
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          label:"Wanting always feels complicated",
          q:"Complicated by what — competing desires, or doubt about whether you deserve them?",
          br:[
            {
              label:"Competing desires",
              q:"Which of your desires are most in conflict right now?",
              br:[
                {
                  label:"Freedom vs belonging",
                  q:"In your most honest accounting — which do you want more? Have you ever let yourself actually choose?",
                  br:[
                    {
                      label:"Freedom",
                      q:"What would freedom cost in belonging — and is that trade one you'd make?"
                    },
                    {
                      label:"Belonging",
                      q:"What would belonging cost in freedom — and when did you last examine that cost?"
                    },
                    {
                      label:"I can't choose",
                      q:"Is that because they're genuinely equal — or because choosing would require a grief you haven't done yet?"
                    }
                  ]
                },
                {
                  label:"Ambition vs presence",
                  q:"What would you regret more — having stayed small and present, or having reached and been absent?",
                  br:[
                    {
                      label:"Staying small",
                      q:"What does small mean — and is it actually small, or just quiet?"
                    },
                    {
                      label:"Being absent",
                      q:"What are you already absent from — and is the reaching proportionate to what it costs?"
                    },
                    {
                      label:"I can't know yet",
                      q:"What information would help you decide — and is that information available?"
                    }
                  ]
                },
                {
                  label:"Who I am vs who I want to become",
                  q:"Is there a version of becoming that doesn't require losing who you are now?",
                  br:[
                    {
                      label:"Yes — it's growth not replacement",
                      q:"What's the continuity — what carries through?"
                    },
                    {
                      label:"No — some loss is built in",
                      q:"What do you most need to grieve before you can become who you're trying to be?"
                    },
                    {
                      label:"I'm not sure",
                      q:"What would you need to know to answer — and is it knowable in advance?"
                    }
                  ]
                }
              ]
            },
            {
              label:"Doubt about deserving",
              q:"Where did you first learn that some wants required deserving?",
              br:[
                {
                  label:"From how I was treated",
                  q:"What treatment taught you your wants were conditional — and is that lesson still running?",
                  br:[
                    {
                      label:"Yes still running",
                      q:"What would interrupting it look like — what's the first move?"
                    },
                    {
                      label:"Less than it used to",
                      q:"What changed — and what's the work still to do?"
                    },
                    {
                      label:"I'm not sure",
                      q:"Where do you feel it most — in relationships, work, how you speak about yourself?"
                    }
                  ]
                },
                {
                  label:"From watching others",
                  q:"Who taught you — by example — that desire was something to earn? Do you admire them for it now?",
                  br:[
                    {
                      label:"Yes, I admire it",
                      q:"Is that admiration genuine — or a way of making the lesson feel chosen?"
                    },
                    {
                      label:"No — I see the cost in them",
                      q:"What's the cost you can see in them that you're trying not to pay?"
                    },
                    {
                      label:"Both",
                      q:"How do you hold someone as both model and cautionary tale?"
                    }
                  ]
                },
                {
                  label:"I'm not sure it was taught",
                  q:"What if the doubt is protection rather than truth? What would you want, unprotected?",
                  br:[
                    {
                      label:"Something specific",
                      q:"What is it? Say it directly, even to yourself."
                    },
                    {
                      label:"I can't fully access it",
                      q:"What gets in the way when you try — what's the quality of the resistance?"
                    },
                    {
                      label:"I'm afraid of finding out",
                      q:"Afraid of wanting something and not being able to have it — or of wanting something that would change everything?"
                    }
                  ]
                }
              ]
            },
            {
              label:"I filter before I even feel",
              q:"What's the filter — values or fear?",
              br:[
                {
                  label:"Values I've chosen",
                  q:"How do they hold up when they prevent something you really want?",
                  br:[
                    {
                      label:"They hold",
                      q:"Is that integrity — or have the values become a wall rather than a guide?"
                    },
                    {
                      label:"It's hard",
                      q:"What does it cost to hold a value against strong desire? Do you acknowledge that cost?"
                    },
                    {
                      label:"Sometimes they fail",
                      q:"When they fail, what happens — and what do you make of the failure?"
                    }
                  ]
                },
                {
                  label:"Mostly fear",
                  q:"What's the most important thing fear is currently filtering out?",
                  br:[
                    {
                      label:"I know what it is",
                      q:"Name it. What arrives when you do?"
                    },
                    {
                      label:"I'm not sure",
                      q:"What do you reach toward when alone — what direction do you face when no one's watching?"
                    },
                    {
                      label:"Several things",
                      q:"Which one would change the most if it came through the filter?"
                    }
                  ]
                },
                {
                  label:"I can't tell the difference",
                  q:"Is there a want that's been filtered so long you don't know if it's genuine?",
                  br:[
                    {
                      label:"Yes",
                      q:"How would you find out? What experiment would reveal it?"
                    },
                    {
                      label:"Maybe",
                      q:"What would you want to have wanted, if you could choose? Is that the real thing?"
                    },
                    {
                      label:"I'm not sure where to look",
                      q:"What's the earliest version of it — what did it look like before the filter arrived?"
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          label:"I've lost touch with what I want",
          q:"When did that disconnection happen — and what was on the other side of it?",
          br:[
            {
              label:"A specific loss or transition",
              q:"What did it ask you to set down — and did you mean for it to be permanent?",
              br:[
                {
                  label:"A relationship that ended",
                  q:"What did you allow yourself to want inside that relationship that you haven't wanted since?",
                  br:[
                    {
                      label:"To be fully known",
                      q:"Being fully known required the relationship to hold it. What would it take to build that again?"
                    },
                    {
                      label:"A specific kind of future",
                      q:"That future — is it gone entirely, or just unreachable by that path?"
                    },
                    {
                      label:"A version of myself",
                      q:"What did that relationship let you be — and can that version exist without it?"
                    }
                  ]
                },
                {
                  label:"A version of my future",
                  q:"The future you gave up wanting — is it actually gone, or in a drawer you haven't opened?",
                  br:[
                    {
                      label:"I think it's gone",
                      q:"When did you decide that — and is the decision still current, or just unchallenged?"
                    },
                    {
                      label:"In a drawer",
                      q:"What would opening it require — and what are you afraid you'd find?"
                    },
                    {
                      label:"I'm not sure",
                      q:"What would you do if it turned out not to be gone?"
                    }
                  ]
                },
                {
                  label:"A part of myself",
                  q:"What would it take to give that part permission to want something again?",
                  br:[
                    {
                      label:"Someone to witness it",
                      q:"Who would need to see it — and do you have anyone who could?"
                    },
                    {
                      label:"More safety than I have",
                      q:"What specifically needs to be safe — and is any version of it achievable now?"
                    },
                    {
                      label:"Time I haven't given it",
                      q:"What would you give up to give it time?"
                    }
                  ]
                }
              ]
            },
            {
              label:"Gradually, without a moment",
              q:"What small things do you still respond to — pleasures, irritations, excitements?",
              br:[
                {
                  label:"Small pleasures",
                  q:"What gives you disproportionate pleasure that you've never told anyone about?",
                  br:[
                    {
                      label:"Something sensory",
                      q:"How much of your daily life contains that — and is it protected or incidental?"
                    },
                    {
                      label:"Something private",
                      q:"What does the privacy protect — the pleasure, or you from claiming it?"
                    },
                    {
                      label:"I feel odd naming it",
                      q:"Why odd — what's the rule that makes naming it strange?"
                    }
                  ]
                },
                {
                  label:"Irritations",
                  q:"What you're most irritated by often maps to what you care about most. What does yours tell you?",
                  br:[
                    {
                      label:"Something about fairness",
                      q:"What specifically do you need to be fair — and are you receiving it?"
                    },
                    {
                      label:"Something about being seen",
                      q:"When are you most irritated — when you're invisible, or when you're misread?"
                    },
                    {
                      label:"I don't trust my irritations",
                      q:"What would you have to trust in yourself to take them seriously as information?"
                    }
                  ]
                },
                {
                  label:"Excitements",
                  q:"The last thing that genuinely excited you — what was it, and what made you able to feel it?",
                  br:[
                    {
                      label:"Something unexpected",
                      q:"What does the unexpectedness suggest — that you can only feel excitement when it can't disappoint?"
                    },
                    {
                      label:"Something I'd been hoping for",
                      q:"How long had you been hoping — and what finally made it possible?"
                    },
                    {
                      label:"I have to think hard to remember",
                      q:"What does that tell you — about this period, not about yourself?"
                    }
                  ]
                }
              ]
            },
            {
              label:"I've always been this way",
              q:"Was there a time before — in childhood, or somewhere — when you knew what you wanted?",
              br:[
                {
                  label:"Yes, in childhood",
                  q:"What did you want then that you're no longer allowed to want? Who took that away?",
                  br:[
                    {
                      label:"I know who",
                      q:"What would you say to them now, if you could? Not to change anything — just to say it."
                    },
                    {
                      label:"No one person — just time",
                      q:"Is that a neutral fact, or a loss? Does childhood desire get to remain available?"
                    },
                    {
                      label:"Taken in a way I haven't examined",
                      q:"What would examining it require of you?"
                    }
                  ]
                },
                {
                  label:"Yes, with someone specific",
                  q:"What did that person make possible — and what does its absence tell you?",
                  br:[
                    {
                      label:"That I need a witness",
                      q:"Is there anyone in your life now who could play that role — or do you have to find them?"
                    },
                    {
                      label:"That I need permission",
                      q:"What would it take to build that permission inside yourself?"
                    },
                    {
                      label:"I'm not sure what it tells me",
                      q:"What would you want it to tell you? Is that the answer?"
                    }
                  ]
                },
                {
                  label:"I'm not sure there was a before",
                  q:"What's the smallest, safest want you could let yourself have right now — just to practice?",
                  br:[
                    {
                      label:"Something immediate",
                      q:"Name it. Say it to yourself. What happens when you do?"
                    },
                    {
                      label:"I can't think of one",
                      q:"What does that blankness feel like — numbness, or just quiet?"
                    },
                    {
                      label:"Something I'd be embarrassed to say",
                      q:"What's embarrassing about it — and is that embarrassment worth listening to?"
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  },
  {
    id:"mortality",
    name:"Mortality",
    sub:"What do you leave?",
    col:"#6A6A6A",
    px:18,
    py:82,
    root:{
      q:"If you knew you had one year left — what would you stop doing first?",
      br:[
        {
          label:"Something I do for others' expectations",
          q:"Which expectation — and who built it, them or a version of you that needed their approval?",
          br:[
            {
              label:"A career or role",
              q:"If you left the role tomorrow, who would you be? Does that person feel available to you?",
              br:[
                {
                  label:"Yes — they feel close",
                  q:"What stops you from starting now? The real reason, not the practical one.",
                  br:[
                    {
                      label:"Fear of losing what I've built",
                      q:"What have you built — and what is it actually for? Is it serving the life you want?"
                    },
                    {
                      label:"I don't think I'm ready",
                      q:"Ready for what specifically — and who decides when ready arrives?"
                    },
                    {
                      label:"Something I haven't named",
                      q:"What would you have to look at to name it?"
                    }
                  ]
                },
                {
                  label:"I've forgotten who I am outside it",
                  q:"When did the merger happen — and is there anything from before that still feels like you?",
                  br:[
                    {
                      label:"Yes — something from before",
                      q:"What is it — and what would it mean to let that older self have more say?"
                    },
                    {
                      label:"I'm not sure there was a before",
                      q:"What does the role give you that you couldn't get elsewhere? Is it replaceable?"
                    },
                    {
                      label:"I'm afraid to look",
                      q:"What's the fear — that there's nothing there, or that what's there wants something different?"
                    }
                  ]
                },
                {
                  label:"The role has become me",
                  q:"Does the original question still land — or is there something the role protects you from?",
                  br:[
                    {
                      label:"Something it protects me from",
                      q:"From what — and is the protection still necessary?"
                    },
                    {
                      label:"The question doesn't land",
                      q:"What would you have to want for it to land?"
                    },
                    {
                      label:"Both — it's complicated",
                      q:"How do you hold a role that's both genuinely you and also protective?"
                    }
                  ]
                }
              ]
            },
            {
              label:"A relationship kept by obligation",
              q:"What keeps you in it — love, guilt, history, fear, or something you haven't named?",
              br:[
                {
                  label:"Guilt",
                  q:"Guilt about what specifically — and is the verdict fair, or a sentence you accepted without checking?",
                  br:[
                    {
                      label:"The verdict is fair",
                      q:"What would making genuine amends look like — not performing it, but actually doing it?"
                    },
                    {
                      label:"The verdict isn't fair",
                      q:"When did you accept an unfair sentence — and what would it take to appeal it?"
                    },
                    {
                      label:"I'm not sure anymore",
                      q:"How long have you been unsure — and what keeps you from finding out?"
                    }
                  ]
                },
                {
                  label:"Fear of who I'd be without it",
                  q:"What does the relationship organize for you — self, routine, identity?",
                  br:[
                    {
                      label:"Identity",
                      q:"Who were you before this relationship defined you — and is that person still there?"
                    },
                    {
                      label:"Routine and structure",
                      q:"Is the structure valuable in itself, or just filling something?"
                    },
                    {
                      label:"I don't know — never been without it",
                      q:"What's most frightening about finding out?"
                    }
                  ]
                },
                {
                  label:"Something I haven't named",
                  q:"Not knowing whether you love someone or are used to them — what would clarity feel like?",
                  br:[
                    {
                      label:"Frightening",
                      q:"Frightening because of what clarity might show — or because of what it would require?"
                    },
                    {
                      label:"A relief",
                      q:"What would you do with the relief?"
                    },
                    {
                      label:"I'm not ready to find out",
                      q:"What would you need to be ready? Is that condition achievable?"
                    }
                  ]
                }
              ]
            },
            {
              label:"Habits that fill time",
              q:"What is the filler keeping at bay?",
              br:[
                {
                  label:"The discomfort of stillness",
                  q:"What's at the bottom of the silence? Most people who can't tolerate stillness are avoiding something specific.",
                  br:[
                    {
                      label:"A feeling",
                      q:"Which one — and when did it become something to avoid?"
                    },
                    {
                      label:"A thought",
                      q:"Which thought — and what happens if you let yourself think it?"
                    },
                    {
                      label:"I've never stayed still long enough",
                      q:"What would it take to try — just one hour of not filling it?"
                    }
                  ]
                },
                {
                  label:"Uncertainty about what I want",
                  q:"Have you ever sat with not-knowing long enough for something to emerge?",
                  br:[
                    {
                      label:"Yes",
                      q:"What came — and what did you do with it?"
                    },
                    {
                      label:"No",
                      q:"What do you think would come if you waited? What arrives in the gaps you do allow?"
                    },
                    {
                      label:"I'm afraid of what would come",
                      q:"What do you think is in there — and is the fear protecting you or costing you?"
                    }
                  ]
                },
                {
                  label:"Fear meaningful things won't work",
                  q:"So partial investment as protection. What's the actual cost of that?",
                  br:[
                    {
                      label:"Missing what I actually want",
                      q:"Name the thing. The actual thing, not the version that's safe to say."
                    },
                    {
                      label:"Becoming someone I don't respect",
                      q:"Do you already see that person starting to form — and what would turning it around look like?"
                    },
                    {
                      label:"I haven't counted the cost",
                      q:"What would happen if you did?"
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          label:"Something I do to feel safe",
          q:"Safety as self-respect, or safety as a cage — honestly, which is yours?",
          br:[
            {
              label:"Closer to a cage",
              q:"What's inside that you haven't been willing to risk?",
              br:[
                {
                  label:"A creative life",
                  q:"When did you last make something with nothing at stake — no audience, no judgment, no point?",
                  br:[
                    {
                      label:"Not long ago",
                      q:"What made it possible — and why isn't that your default?"
                    },
                    {
                      label:"A long time ago",
                      q:"What changed — when did stakes become attached to making things?"
                    },
                    {
                      label:"I'm not sure I ever have",
                      q:"What would you make, right now, if no one would ever see it?"
                    }
                  ]
                },
                {
                  label:"A different kind of intimacy",
                  q:"The love you want but don't pursue — is it a type of person, a depth of openness, or a version of yourself?",
                  br:[
                    {
                      label:"A type of person",
                      q:"What does that person have that the ones you've chosen haven't? What makes them feel too risky?"
                    },
                    {
                      label:"A depth of openness",
                      q:"What would you have to offer to invite that depth? Have you ever offered it?"
                    },
                    {
                      label:"A version of myself",
                      q:"What does that version of you want that the current version is protecting against?"
                    }
                  ]
                },
                {
                  label:"A completely different life",
                  q:"What would that life look like on a specific Tuesday — the actual texture of a day?",
                  br:[
                    {
                      label:"I can picture it clearly",
                      q:"How long have you been able to picture it? What's the gap between picture and step?"
                    },
                    {
                      label:"I can't quite see it",
                      q:"What's blurry — the life itself, or who you'd be in it?"
                    },
                    {
                      label:"I don't let myself picture it",
                      q:"What does not picturing it protect?"
                    }
                  ]
                }
              ]
            },
            {
              label:"Genuine self-respect",
              q:"Chosen limits aren't fear. What have you deliberately stepped back from — and were you right?",
              br:[
                {
                  label:"Yes, and I'm glad",
                  q:"How do you know the self-knowledge was genuine — and not just protection being convenient?",
                  br:[
                    {
                      label:"The consequences confirmed it",
                      q:"What were the consequences — and would you make the same choice knowing them in advance?"
                    },
                    {
                      label:"It felt different from fear",
                      q:"How did it feel different? What's the quality of the difference?"
                    },
                    {
                      label:"I'm not fully sure",
                      q:"What would make you sure — what evidence would settle it?"
                    }
                  ]
                },
                {
                  label:"I'm not sure anymore",
                  q:"What's changed — circumstances, or your sense of your own limits?",
                  br:[
                    {
                      label:"Circumstances changed",
                      q:"Does the limit still make sense given the new circumstances — or is it a habit now?"
                    },
                    {
                      label:"My sense of what I can bear",
                      q:"Have you become more or less robust over time? What accounts for the change?"
                    },
                    {
                      label:"I've started to doubt myself",
                      q:"Is the doubt new information — or an old voice returning?"
                    }
                  ]
                },
                {
                  label:"I've called fear wisdom before",
                  q:"When did you realize — and what changed in how you listen to that instinct?",
                  br:[
                    {
                      label:"I'm more skeptical of it now",
                      q:"How do you test it — what's the check you run on a strong feeling of no?"
                    },
                    {
                      label:"Still learning the difference",
                      q:"What's the most recent thing you've been uncertain about — fear or self-knowledge?"
                    },
                    {
                      label:"I'm not sure I've fully corrected",
                      q:"What would correction look like — what would you do or be differently?"
                    }
                  ]
                }
              ]
            },
            {
              label:"Nothing — I'd be present",
              q:"Beautiful. But is that actually true — or who you want to be in theory?",
              br:[
                {
                  label:"Probably not fully true",
                  q:"The gap between claimed values and lived life. What would close it — even slightly?",
                  br:[
                    {
                      label:"Admitting what I actually want",
                      q:"What do you want that you haven't admitted? Not the safe version — the real one.",
                      br:[
                        {
                          label:"Something in work",
                          q:"What would the work look like if you built it around what you actually want?"
                        },
                        {
                          label:"Something in relationships",
                          q:"The kind of connection you actually want — have you ever described it out loud to anyone?"
                        },
                        {
                          label:"Something about how I live",
                          q:"The life you actually want — how different is it from the one you have? What's the biggest gap?"
                        }
                      ]
                    },
                    {
                      label:"Stopping the waiting",
                      q:"What condition have you made a prerequisite for your own life? Who is supposed to grant it?",
                      br:[
                        {
                          label:"A level of stability",
                          q:"What specifically needs to be stable — and is any version of it actually achievable?"
                        },
                        {
                          label:"Someone's approval or readiness",
                          q:"Is that your condition to set — and what have you been postponing for it?"
                        },
                        {
                          label:"Something I haven't identified",
                          q:"What if the waiting is protecting you from something specific?"
                        }
                      ]
                    },
                    {
                      label:"Something I can't control",
                      q:"When has waiting for external conditions worked — and when has it cost you years?",
                      br:[
                        {
                          label:"Waiting has worked sometimes",
                          q:"What was different — what made those conditions actually worth waiting for?"
                        },
                        {
                          label:"Mostly it's cost me",
                          q:"What's the most you've lost to waiting — and what would you do differently now?"
                        },
                        {
                          label:"I can't tell the difference",
                          q:"What would you need to see clearly to tell necessary waiting from avoidance?"
                        }
                      ]
                    }
                  ]
                },
                {
                  label:"Yes — I think it's genuinely true",
                  q:"What did you let go of to get here — and what made it possible?",
                  br:[
                    {
                      label:"Something was taken from me",
                      q:"What did the loss give you — and would you trade the gift to undo what caused it?",
                      br:[
                        {
                          label:"No — I'd keep both",
                          q:"What does it mean that loss became gift? Does that make the loss acceptable, or is that too neat?"
                        },
                        {
                          label:"Yes — I'd undo it",
                          q:"You'd give back what you gained to have what you lost. What does that tell you about what matters most?"
                        },
                        {
                          label:"I'm still not sure",
                          q:"The uncertainty about whether to undo it — is that unresolved grief, or genuine complexity?"
                        }
                      ]
                    },
                    {
                      label:"I chose it deliberately",
                      q:"What made you trust that what remained was enough — and is it still?",
                      br:[
                        {
                          label:"Still enough",
                          q:"What's the ground of that enough-ness — what keeps it stable?"
                        },
                        {
                          label:"Some days harder",
                          q:"What makes it unstable on the hard days — and what restores it?"
                        },
                        {
                          label:"I'm testing that question now",
                          q:"What's making you test it — and what would not enough require of you?"
                        }
                      ]
                    },
                    {
                      label:"Both, slowly, over time",
                      q:"What's still unfinished — what are you holding that you'd wish you'd put down?",
                      br:[
                        {
                          label:"An old grief",
                          q:"Is it unprocessed, or just slow? How do you tell the difference in yourself?"
                        },
                        {
                          label:"An unresolved relationship",
                          q:"Unresolved in what sense — the feeling, the communication, or both?"
                        },
                        {
                          label:"Something I haven't named yet",
                          q:"What would naming it require — and what might arrive once it's named?"
                        }
                      ]
                    }
                  ]
                },
                {
                  label:"I wouldn't know until it was real",
                  q:"Most people believe they'd transform with mortality — then discover they're mostly themselves. What does that say?",
                  br:[
                    {
                      label:"We're more stubborn than we think",
                      q:"What's the most stubborn thing in you that has survived every attempt to change it?",
                      br:[
                        {
                          label:"A way I relate to people",
                          q:"What would shifting it require — and have you ever come close?"
                        },
                        {
                          label:"A belief about myself",
                          q:"Is it a fact or a story? And does it matter, given how it operates?"
                        },
                        {
                          label:"Something I can't quite see",
                          q:"What do people who know you well say about it — and are they right?"
                        }
                      ]
                    },
                    {
                      label:"We need real stakes to shift",
                      q:"What would you have to lose to genuinely change — and is there a way to learn it without losing it?",
                      br:[
                        {
                          label:"The stakes already exist",
                          q:"What stakes are already present that you're not fully registering?"
                        },
                        {
                          label:"Nothing has made them feel real",
                          q:"What would make them real — and why hasn't it happened yet?"
                        },
                        {
                          label:"I'm not sure change is possible for me",
                          q:"Is that a conclusion from evidence — or the stubbornness itself, turned into a belief?"
                        }
                      ]
                    },
                    {
                      label:"I think I'd surprise myself",
                      q:"Which direction — more courageous than expected, or more attached?",
                      br:[
                        {
                          label:"More courageous",
                          q:"What's the courage already there, waiting? What does it want to do?"
                        },
                        {
                          label:"More attached",
                          q:"What are you more attached to than you admit — and what does that tell you?"
                        },
                        {
                          label:"I genuinely don't know",
                          q:"Not knowing which — is that humility, or have you just not looked?"
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  },
  {
    id:"belonging",
    name:"Belonging",
    sub:"Where is home?",
    col:"#5A7A5A",
    px:42,
    py:62,
    root:{
      q:"Is there a place, a person, or a state of mind where you've felt completely at home — not performing, not adjusting?",
      br:[
        {
          label:"Yes — a place",
          q:"What was in that place that let you stop performing?",
          br:[
            {
              label:"Familiarity",
              q:"Is it the place itself — or what it contains: people, memories, who you were there?",
              br:[
                {
                  label:"The place itself",
                  q:"Have you been back — and is it still home, or has the home moved inside you?",
                  br:[
                    {
                      label:"Still home",
                      q:"What keeps it — what has it held that hasn't changed?"
                    },
                    {
                      label:"The home has moved inside",
                      q:"What does it mean to carry a place internally? What does that version give you?"
                    },
                    {
                      label:"I haven't gone back",
                      q:"What stops you — fear it will have changed, or fear of what you'd feel?"
                    }
                  ]
                },
                {
                  label:"The people",
                  q:"If those people are gone or changed — what becomes of the home? What happens when belonging untethers?",
                  br:[
                    {
                      label:"I've felt it untether",
                      q:"What did you find once the tethering was gone — what was underneath the belonging?"
                    },
                    {
                      label:"I'm feeling it now",
                      q:"What's changing — the people, or how you relate to them?"
                    },
                    {
                      label:"I can't imagine it",
                      q:"What would be hardest to lose — the people themselves, or the version of you they reflect?"
                    }
                  ]
                },
                {
                  label:"Who I was there",
                  q:"Can you still be that person elsewhere — or is that version only available in that context?",
                  br:[
                    {
                      label:"I can sometimes",
                      q:"What conditions bring them out — and how do you recognize when they're present?"
                    },
                    {
                      label:"Only there",
                      q:"What does that place hold that you can't carry — is it external, or something you won't let yourself have elsewhere?"
                    },
                    {
                      label:"I'm not sure that person exists anymore",
                      q:"What happened to them — and is there mourning to do, or becoming?"
                    }
                  ]
                }
              ]
            },
            {
              label:"Distance from judgment",
              q:"If belonging requires distance from judgment — what does that say about the relationships that don't offer it?",
              br:[
                {
                  label:"They ask something hard of me",
                  q:"What do they ask — and is it making you stronger, or just wearing you down?",
                  br:[
                    {
                      label:"Making me stronger",
                      q:"What specifically has the difficulty built — can you name a change it's produced?"
                    },
                    {
                      label:"Wearing me down",
                      q:"How long have you been in contact with that wearing-down? What would rest look like?"
                    },
                    {
                      label:"I can't tell yet",
                      q:"What would tell you — what indicator are you watching for?"
                    }
                  ]
                },
                {
                  label:"They're not my real community",
                  q:"Who is — and how much of your time actually goes to them?",
                  br:[
                    {
                      label:"Almost none",
                      q:"What has prevented that — and is the prevention external or something you're choosing?"
                    },
                    {
                      label:"Some, but not enough",
                      q:"What's the gap, and what would closing it require?"
                    },
                    {
                      label:"I'm not sure I have one",
                      q:"When did you last feel a sense of real community — and what happened to it?"
                    }
                  ]
                },
                {
                  label:"I have no relationships without judgment",
                  q:"What would finding one require — a change in who you seek, or something you'd lower in yourself?",
                  br:[
                    {
                      label:"A change in who I seek",
                      q:"What kind of person would that be — and where have you looked?"
                    },
                    {
                      label:"Something I'd lower",
                      q:"What specifically — and would lowering it actually feel like loss?"
                    },
                    {
                      label:"I'm not sure it's possible",
                      q:"Is that a conclusion from evidence — or a protection from risking it again?"
                    }
                  ]
                }
              ]
            },
            {
              label:"Something I couldn't name then",
              q:"Can you name it now? What was available there that isn't elsewhere?",
              br:[
                {
                  label:"Silence that wasn't lonely",
                  q:"Where do you find that now — and if nowhere, how long has it been?",
                  br:[
                    {
                      label:"I find it sometimes",
                      q:"Where — and what makes it possible?"
                    },
                    {
                      label:"A long time since",
                      q:"What has filled the silence that's arrived since — and is it filling it well?"
                    },
                    {
                      label:"I've forgotten what it felt like",
                      q:"What's the earliest memory of silence that felt like company rather than absence?"
                    }
                  ]
                },
                {
                  label:"Feeling like enough",
                  q:"Have you felt that recently — not impressive, not failing, just enough? What caused it?",
                  br:[
                    {
                      label:"Yes",
                      q:"How long did it last — and what ended it?"
                    },
                    {
                      label:"Not for a long time",
                      q:"What would have to stop for enough to become available again?"
                    },
                    {
                      label:"I'm not sure I've ever felt it",
                      q:"What would it take to feel it once — not permanently, just once?"
                    }
                  ]
                },
                {
                  label:"I still don't have words",
                  q:"Some homes live below language. What happens in your body when you try to approach it?",
                  br:[
                    {
                      label:"Something opens",
                      q:"What opens — and what does that opening want?"
                    },
                    {
                      label:"Something closes",
                      q:"What's the closing protecting? What would stay safe if you didn't approach it?"
                    },
                    {
                      label:"I go still",
                      q:"What is the stillness — grief, recognition, or something else?"
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          label:"Yes — a person",
          q:"What did that person do — or not do — that let you stop adjusting?",
          br:[
            {
              label:"They didn't need me to be anything",
              q:"What is it like to be needed-to-be-nothing? How rare is it in your life?",
              br:[
                {
                  label:"Very rare",
                  q:"What would you have to risk to let someone see you that way?",
                  br:[
                    {
                      label:"Being disappointing",
                      q:"Disappointing in what — their expectations, or your own?"
                    },
                    {
                      label:"Being ordinary",
                      q:"Is ordinary actually the fear — or something adjacent?"
                    },
                    {
                      label:"Being actually known",
                      q:"What would being fully known require you to show that you haven't?"
                    }
                  ]
                },
                {
                  label:"I have a few like that",
                  q:"What made those relationships possible — what did you have to do or be first?",
                  br:[
                    {
                      label:"I had to be honest first",
                      q:"What specific honesty opened it — and can you do that again?"
                    },
                    {
                      label:"They created the safety",
                      q:"What did they do — and is there a version of you that could do that for someone else?"
                    },
                    {
                      label:"Time and circumstance",
                      q:"Can it be built more deliberately — or does it always require that kind of accident?"
                    }
                  ]
                },
                {
                  label:"Just that one person",
                  q:"What happened — and what do you carry from it?",
                  br:[
                    {
                      label:"They're gone",
                      q:"What did their being gone teach you about what you'd had?"
                    },
                    {
                      label:"We changed",
                      q:"Did the change come from inside or outside — and is any version of what you had still there?"
                    },
                    {
                      label:"It's complicated",
                      q:"What makes it complicated — and does the complication cost anything now?"
                    }
                  ]
                }
              ]
            },
            {
              label:"They saw something I couldn't",
              q:"What was it — and have you been able to hold onto it since?",
              br:[
                {
                  label:"Yes, it stayed",
                  q:"How has being seen changed how you see yourself?",
                  br:[
                    {
                      label:"I believe something I didn't before",
                      q:"What is the belief — and does it hold even when nothing external confirms it?"
                    },
                    {
                      label:"I expect more from relationships",
                      q:"Is that expectation being met — and what happens when it isn't?"
                    },
                    {
                      label:"It still surprises me",
                      q:"What is it surprising to believe about yourself — why does it still land?"
                    }
                  ]
                },
                {
                  label:"It faded",
                  q:"What caused the fading — time, loss, or an old voice returning?",
                  br:[
                    {
                      label:"Time",
                      q:"What keeps a seeing from becoming permanent — what would make it stick?"
                    },
                    {
                      label:"Loss of the person",
                      q:"Can you hold onto what they saw even without them — what would that require?"
                    },
                    {
                      label:"An old voice",
                      q:"Which voice — and how did it get back in?"
                    }
                  ]
                },
                {
                  label:"I'm still trying to hold it",
                  q:"What makes it hard — what internal weather makes it easier or harder to believe?",
                  br:[
                    {
                      label:"My own doubts",
                      q:"What specifically are you doubting — the seeing, the seer, or yourself?"
                    },
                    {
                      label:"What's happening around me",
                      q:"Which external things most erode it — and is any of that within your control?"
                    },
                    {
                      label:"I'm not sure",
                      q:"When is it easiest to hold — what conditions support it?"
                    }
                  ]
                }
              ]
            },
            {
              label:"I felt safe enough to be uncertain",
              q:"Safety for uncertainty — what does that ask of the other person?",
              br:[
                {
                  label:"Patience",
                  q:"Who is patient with you in a way you haven't fully acknowledged? Have you told them?",
                  br:[
                    {
                      label:"Yes",
                      q:"What was it like to tell them — and what happened?"
                    },
                    {
                      label:"Not yet",
                      q:"What stops you — and what would telling them give you both?"
                    },
                    {
                      label:"I'm not sure who it is",
                      q:"Who comes to mind first when you think of patience extended to you?"
                    }
                  ]
                },
                {
                  label:"The same uncertainty back",
                  q:"Mutual not-knowing as intimacy — have you had that? What did it feel like?",
                  br:[
                    {
                      label:"Yes",
                      q:"What made it possible — and can you get back to it?"
                    },
                    {
                      label:"Not really",
                      q:"What would it require of you to offer your uncertainty first?"
                    },
                    {
                      label:"I'm not sure",
                      q:"When have you felt least alone in not-knowing — what were the circumstances?"
                    }
                  ]
                },
                {
                  label:"Just presence",
                  q:"The ones who are just there — is there someone like that in your life now?",
                  br:[
                    {
                      label:"Yes",
                      q:"Do they know what their presence means to you?"
                    },
                    {
                      label:"Not right now",
                      q:"When did you last have that — and what happened?"
                    },
                    {
                      label:"I'm not sure I'd recognize it",
                      q:"What does presence feel like when you've experienced it? How do you know it's there?"
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          label:"Never fully",
          q:"Have you ever come close — and what stopped it from completing?",
          br:[
            {
              label:"I've come close",
              q:"What prevented completion — your own withdrawal, or something in the circumstances?",
              br:[
                {
                  label:"My withdrawal",
                  q:"What pulls you back — a fear, a habit, something you'd rather not look at?",
                  br:[
                    {
                      label:"Fear of what comes after",
                      q:"After belonging — what? Is there a fear that it could be taken away?"
                    },
                    {
                      label:"A habit of leaving first",
                      q:"When did the habit form — and has it protected you from something, or just from belonging?"
                    },
                    {
                      label:"Something I haven't named",
                      q:"What's the closest you can get to naming it?"
                    }
                  ]
                },
                {
                  label:"The circumstances",
                  q:"If circumstances changed — would belonging be possible, or would you bring the barrier?",
                  br:[
                    {
                      label:"I think I'd find it",
                      q:"What circumstances would help most — and how much control do you have over them?"
                    },
                    {
                      label:"I think I'd bring it",
                      q:"What is the barrier — and where did you build it?"
                    },
                    {
                      label:"I genuinely don't know",
                      q:"What experiment would tell you?"
                    }
                  ]
                },
                {
                  label:"Both",
                  q:"Which is harder to work with — your own withdrawal, or a world that withdraws?",
                  br:[
                    {
                      label:"My own withdrawal",
                      q:"What would meeting it rather than avoiding it require?"
                    },
                    {
                      label:"A world that withdraws",
                      q:"Where has the world most repeatedly withdrawn — and what have you made of that pattern?"
                    },
                    {
                      label:"I can't separate them",
                      q:"Does the inseparability itself tell you something?"
                    }
                  ]
                }
              ]
            },
            {
              label:"I've stopped looking",
              q:"Is that acceptance — or protection?",
              br:[
                {
                  label:"Acceptance",
                  q:"What had to die for you to arrive at acceptance — and is the death still recent?",
                  br:[
                    {
                      label:"Still recent",
                      q:"What does grief for something you've accepted feel like — can both be true at once?"
                    },
                    {
                      label:"Long past",
                      q:"What did living through it teach you that you couldn't have learned another way?"
                    },
                    {
                      label:"I'm not sure it's fully dead",
                      q:"What keeps it alive — and is that a problem or just reality?"
                    }
                  ]
                },
                {
                  label:"Protection",
                  q:"What are you protecting from — the pain of almost-belonging, or the exposure of wanting it?",
                  br:[
                    {
                      label:"The pain of almost",
                      q:"How many almosts have there been — and what has the accumulation done to you?"
                    },
                    {
                      label:"The exposure of wanting",
                      q:"What is it about wanting belonging that feels exposing?"
                    },
                    {
                      label:"Both",
                      q:"Is there any version of trying again that doesn't require dropping the protection entirely?"
                    }
                  ]
                },
                {
                  label:"I'm not sure anymore",
                  q:"When did the certainty about which one it is disappear?",
                  br:[
                    {
                      label:"After something happened",
                      q:"What happened — and how did it change how you hold the question?"
                    },
                    {
                      label:"Gradually",
                      q:"What has gradually accumulated that made the certainty harder to maintain?"
                    },
                    {
                      label:"It was never certain",
                      q:"What would certainty have required — was it ever fully available?"
                    }
                  ]
                }
              ]
            },
            {
              label:"I'm not sure belonging is possible for me",
              q:"Is that a conclusion from evidence — or a story protecting you from risking it?",
              br:[
                {
                  label:"A conclusion from evidence",
                  q:"What's the most recent evidence — and is it still current?",
                  br:[
                    {
                      label:"It's still current",
                      q:"What would evidence to the contrary look like — and would you recognize it?"
                    },
                    {
                      label:"It's older",
                      q:"How much has changed since then — in you, in what you have to offer?"
                    },
                    {
                      label:"I keep updating it",
                      q:"What does each update require — and what would evidence that changed the conclusion do to you?"
                    }
                  ]
                },
                {
                  label:"Probably a story",
                  q:"What would you have to risk to test it — the real risk, not the reasonable-sounding one?",
                  br:[
                    {
                      label:"Being seen wanting it",
                      q:"What does wanting belonging say about you that you're afraid to own?"
                    },
                    {
                      label:"Being rejected for who I am",
                      q:"Has that happened — and how do you carry it?"
                    },
                    {
                      label:"Finding it and then losing it",
                      q:"Is it the belonging you fear losing — or the hope?"
                    }
                  ]
                },
                {
                  label:"Both, and I've made peace",
                  q:"What does belonging-without-belonging look like — how do you build around a want you don't pursue?",
                  br:[
                    {
                      label:"I've found substitutes",
                      q:"Are they substitutes — or have they become the real thing?"
                    },
                    {
                      label:"I've made beauty out of the distance",
                      q:"What has the distance allowed — what can only be made from outside?"
                    },
                    {
                      label:"I'm still learning how",
                      q:"What does the learning look like right now — what are you figuring out?"
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  }
];
