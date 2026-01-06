export interface Quote {
  text: string;
  source: string;
}

export type Difficulty = "easy" | "medium" | "hard";

const quotes: Record<Difficulty, Quote[]> = {
  easy: [
    // Short, simple quotes (under 100 characters)
    {
      text: "The only way to do great work is to love what you do.",
      source: "Steve Jobs",
    },
    {
      text: "Be the change you wish to see in the world.",
      source: "Mahatma Gandhi",
    },
    {
      text: "In the middle of difficulty lies opportunity.",
      source: "Albert Einstein",
    },
    {
      text: "The journey of a thousand miles begins with a single step.",
      source: "Lao Tzu",
    },
    {
      text: "What you do today can improve all your tomorrows.",
      source: "Ralph Marston",
    },
    {
      text: "Believe you can and you are halfway there.",
      source: "Theodore Roosevelt",
    },
    {
      text: "The best time to plant a tree was twenty years ago. The second best time is now.",
      source: "Chinese Proverb",
    },
    {
      text: "It does not matter how slowly you go as long as you do not stop.",
      source: "Confucius",
    },
    {
      text: "Everything you have ever wanted is on the other side of fear.",
      source: "George Addair",
    },
    {
      text: "The only impossible journey is the one you never begin.",
      source: "Tony Robbins",
    },
    {
      text: "Act as if what you do makes a difference. It does.",
      source: "William James",
    },
    {
      text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
      source: "Winston Churchill",
    },
    {
      text: "The future belongs to those who believe in the beauty of their dreams.",
      source: "Eleanor Roosevelt",
    },
    {
      text: "It is during our darkest moments that we must focus to see the light.",
      source: "Aristotle",
    },
    {
      text: "The only limit to our realization of tomorrow is our doubts of today.",
      source: "Franklin D. Roosevelt",
    },
    {
      text: "Do what you can, with what you have, where you are.",
      source: "Theodore Roosevelt",
    },
    {
      text: "You miss one hundred percent of the shots you do not take.",
      source: "Wayne Gretzky",
    },
    {
      text: "I have not failed. I have just found ten thousand ways that will not work.",
      source: "Thomas Edison",
    },
    {
      text: "The mind is everything. What you think you become.",
      source: "Buddha",
    },
    {
      text: "Strive not to be a success, but rather to be of value.",
      source: "Albert Einstein",
    },
    {
      text: "Your time is limited, do not waste it living someone else's life.",
      source: "Steve Jobs",
    },
    { text: "The best revenge is massive success.", source: "Frank Sinatra" },
    {
      text: "Life is what happens when you are busy making other plans.",
      source: "John Lennon",
    },
    {
      text: "Twenty years from now you will be more disappointed by the things you did not do.",
      source: "Mark Twain",
    },
    { text: "Quality is not an act, it is a habit.", source: "Aristotle" },
  ],

  medium: [
    // Medium length quotes (100-200 characters)
    {
      text: "Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful.",
      source: "Albert Schweitzer",
    },
    {
      text: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
      source: "Nelson Mandela",
    },
    {
      text: "Life is really simple, but we insist on making it complicated. The more you know, the more you realize you do not know.",
      source: "Confucius",
    },
    {
      text: "In three words I can sum up everything I have learned about life: it goes on. No matter what happens, keep moving forward.",
      source: "Robert Frost",
    },
    {
      text: "The only person you are destined to become is the person you decide to be. Your choices define your destiny.",
      source: "Ralph Waldo Emerson",
    },
    {
      text: "Tell me and I forget. Teach me and I remember. Involve me and I learn. Experience is the best teacher.",
      source: "Benjamin Franklin",
    },
    {
      text: "It is not the strongest of the species that survives, nor the most intelligent, but the one most responsive to change.",
      source: "Charles Darwin",
    },
    {
      text: "A person who never made a mistake never tried anything new. Failure is simply the opportunity to begin again more intelligently.",
      source: "Albert Einstein",
    },
    {
      text: "The only thing we have to fear is fear itself. Courage is not the absence of fear, but rather the judgment that something else is more important.",
      source: "Franklin D. Roosevelt",
    },
    {
      text: "Education is the most powerful weapon which you can use to change the world. It is the passport to the future.",
      source: "Nelson Mandela",
    },
    {
      text: "Innovation distinguishes between a leader and a follower. Stay hungry, stay foolish, and never stop learning.",
      source: "Steve Jobs",
    },
    {
      text: "Two things are infinite: the universe and human stupidity. And I am not sure about the universe.",
      source: "Albert Einstein",
    },
    {
      text: "The purpose of our lives is to be happy. That is the ultimate goal. Everything else is secondary to this fundamental truth.",
      source: "Dalai Lama",
    },
    {
      text: "You only live once, but if you do it right, once is enough. Make every moment count and live without regrets.",
      source: "Mae West",
    },
    {
      text: "The way to get started is to quit talking and begin doing. Action is the foundational key to all success.",
      source: "Walt Disney",
    },
    {
      text: "If life were predictable it would cease to be life, and be without flavor. Embrace the uncertainty.",
      source: "Eleanor Roosevelt",
    },
    {
      text: "Spread love everywhere you go. Let no one ever come to you without leaving happier than they arrived.",
      source: "Mother Teresa",
    },
    {
      text: "When you reach the end of your rope, tie a knot in it and hang on. Persistence is the key to success.",
      source: "Franklin D. Roosevelt",
    },
    {
      text: "Always remember that you are absolutely unique. Just like everyone else. Embrace your individuality.",
      source: "Margaret Mead",
    },
    {
      text: "Do not go where the path may lead, go instead where there is no path and leave a trail behind you.",
      source: "Ralph Waldo Emerson",
    },
  ],

  hard: [
    // Long, complex quotes (200+ characters)
    {
      text: "We live in a society exquisitely dependent on science and technology, in which hardly anyone knows anything about science and technology. This is a clear prescription for disaster. We might get away with it for a while, but eventually this combustible mixture of ignorance and power is going to blow up in our faces.",
      source: "Carl Sagan",
    },
    {
      text: "The reasonable man adapts himself to the world; the unreasonable one persists in trying to adapt the world to himself. Therefore all progress depends on the unreasonable man. It is our duty to be unreasonable when reason leads us astray.",
      source: "George Bernard Shaw",
    },
    {
      text: "I have learned over the years that when one's mind is made up, this diminishes fear; knowing what must be done does away with fear. Fear is a reaction. Courage is a decision. You cannot control your fear, but you can control your reaction to it.",
      source: "Rosa Parks",
    },
    {
      text: "The test of a first-rate intelligence is the ability to hold two opposed ideas in mind at the same time and still retain the ability to function. One should, for example, be able to see that things are hopeless and yet be determined to make them otherwise.",
      source: "F. Scott Fitzgerald",
    },
    {
      text: "We are what we repeatedly do. Excellence, then, is not an act, but a habit. The soul is dyed the color of its thoughts. Think only on those things that are in line with your principles and can bear the light of day.",
      source: "Aristotle",
    },
    {
      text: "The paradox of our time in history is that we have taller buildings but shorter tempers, wider freeways but narrower viewpoints. We spend more but have less, we buy more but enjoy less. We have bigger houses and smaller families.",
      source: "Bob Moorehead",
    },
    {
      text: "The true sign of intelligence is not knowledge but imagination. Logic will get you from A to B. Imagination will take you everywhere. The important thing is not to stop questioning. Curiosity has its own reason for existing.",
      source: "Albert Einstein",
    },
    {
      text: "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment. Finish each day and be done with it. You have done what you could. Some blunders and absurdities no doubt crept in; forget them as soon as you can.",
      source: "Ralph Waldo Emerson",
    },
    {
      text: "The only thing necessary for the triumph of evil is for good men to do nothing. Those who would give up essential Liberty, to purchase a little temporary Safety, deserve neither Liberty nor Safety. Freedom is never more than one generation away from extinction.",
      source: "Edmund Burke",
    },
    {
      text: "Here is the test to find whether your mission on Earth is finished: if you are alive, it is not. The meaning of life is to find your gift. The purpose of life is to give it away. What you leave behind is not what is engraved in stone monuments, but what is woven into the lives of others.",
      source: "Pericles",
    },
    {
      text: "Darkness cannot drive out darkness; only light can do that. Hate cannot drive out hate; only love can do that. The time is always right to do what is right. Our lives begin to end the day we become silent about things that matter. Faith is taking the first step even when you do not see the whole staircase.",
      source: "Martin Luther King Jr.",
    },
    {
      text: "The most common way people give up their power is by thinking they do not have any. What lies behind us and what lies before us are tiny matters compared to what lies within us. Our deepest fear is not that we are inadequate. Our deepest fear is that we are powerful beyond measure.",
      source: "Marianne Williamson",
    },
    {
      text: "Twenty years from now you will be more disappointed by the things that you did not do than by the ones you did do. So throw off the bowlines. Sail away from the safe harbor. Catch the trade winds in your sails. Explore. Dream. Discover. The secret of getting ahead is getting started.",
      source: "Mark Twain",
    },
    {
      text: "The credit belongs to the man who is actually in the arena, whose face is marred by dust and sweat and blood; who strives valiantly; who errs, who comes short again and again, because there is no effort without error and shortcoming. Far better is it to dare mighty things, to win glorious triumphs, even though checkered by failure.",
      source: "Theodore Roosevelt",
    },
    {
      text: "It is not the critic who counts; not the man who points out how the strong man stumbles, or where the doer of deeds could have done them better. The credit belongs to the man who is actually in the arena, whose face is marred by dust and sweat and blood; who strives valiantly; who errs, who comes short again and again.",
      source: "Theodore Roosevelt",
    },
  ],
};

export function getRandomQuote({
  difficulty,
}: {
  difficulty: Difficulty;
}): Quote {
  const pool = quotes[difficulty];
  return pool[Math.floor(Math.random() * pool.length)];
}

export function getAllQuotes(): Record<Difficulty, Quote[]> {
  return quotes;
}

const quotesExport = { quotes, getRandomQuote, getAllQuotes };
export default quotesExport;
