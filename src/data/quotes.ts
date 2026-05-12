export type QuoteCategory = 'Motivation' | 'Life' | 'Success' | 'Love' | 'Wisdom';

export interface Quote {
  id: string;
  textEn: string;
  textNe: string;
  author: string;
  category: QuoteCategory;
}

export const quotes: Quote[] = [
  { id: '1', textEn: 'The only way to do great work is to love what you do.', textNe: 'महान काम गर्ने एउटै तरिका हो, आफूले गर्ने कामलाई माया गर्नु।', author: 'Steve Jobs', category: 'Success' },
  { id: '2', textEn: 'Life is what happens when you are busy making other plans.', textNe: 'जीवन त्यही हो जुन तपाईं अन्य योजनाहरू बनाउन व्यस्त हुँदा भइरहेको हुन्छ।', author: 'John Lennon', category: 'Life' },
  { id: '3', textEn: 'Success is not final, failure is not fatal: it is the courage to continue that counts.', textNe: 'सफलता अन्तिम होइन, असफलता घातक होइन: निरन्तरता दिने साहस नै महत्त्वपूर्ण हो।', author: 'Winston Churchill', category: 'Success' },
  { id: '4', textEn: 'Believe you can and you are halfway there.', textNe: 'तपाईं सक्नुहुन्छ भनेर विश्वास गर्नुहोस्, तपाईंले आधा बाटो पार गरिसक्नुभयो।', author: 'Theodore Roosevelt', category: 'Motivation' },
  { id: '5', textEn: 'In the end, it is not the years in your life that count. It is the life in your years.', textNe: 'अन्तमा, तपाईंको जीवनका वर्षहरू गणना गरिँदैन, वर्षहरूमा जिइएको जीवन गणना गरिन्छ।', author: 'Abraham Lincoln', category: 'Life' },
  { id: '6', textEn: 'You miss 100% of the shots you do not take.', textNe: 'तपाईंले प्रयास नगरेका १००% अवसरहरू गुमाउनुहुन्छ।', author: 'Wayne Gretzky', category: 'Motivation' },
  { id: '7', textEn: 'The best way to predict the future is to invent it.', textNe: 'भविष्यवाणी गर्ने सबैभन्दा राम्रो तरिका यसको निर्माण गर्नु हो।', author: 'Alan Kay', category: 'Success' },
  { id: '8', textEn: 'Do not wait for the perfect moment, take the moment and make it perfect.', textNe: 'उत्तम समयको पर्खाइमा नबस्नुहोस्, समयलाई लिएर उत्तम बनाउनुहोस्।', author: 'Anonymous', category: 'Motivation' },
  { id: '9', textEn: 'Knowledge speakes, but wisdom listens.', textNe: 'ज्ञान बोल्छ, तर बुद्धि सुन्छ।', author: 'Jimi Hendrix', category: 'Wisdom' },
  { id: '10', textEn: 'Time is the most valuable thing a man can spend.', textNe: 'समय मानिसले खर्च गर्न सक्ने सबैभन्दा मूल्यवान् वस्तु हो।', author: 'Theophrastus', category: 'Wisdom' },
  { id: '11', textEn: 'The mind is everything. What you think you become.', textNe: 'मन नै सबैथोक हो। तपाईं जे सोच्नुहुन्छ, त्यही बन्नुहुन्छ।', author: 'Buddha', category: 'Wisdom' },
  { id: '12', textEn: 'Love all, trust a few, do wrong to none.', textNe: 'सबैलाई माया गर, केहीलाई विश्वास गर, कसैलाई नराम्रो नगर।', author: 'William Shakespeare', category: 'Love' },
  { id: '13', textEn: 'Education is the most powerful weapon which you can use to change the world.', textNe: 'शिक्षा सबैभन्दा शक्तिशाली हतियार हो, जसको प्रयोगले तपाईं संसार परिवर्तन गर्न सक्नुहुन्छ।', author: 'Nelson Mandela', category: 'Wisdom' },
  { id: '14', textEn: 'It always seems impossible until it is done.', textNe: 'कुनै पनि काम गर्दा सम्म असम्भव नै लाग्छ।', author: 'Nelson Mandela', category: 'Motivation' },
  { id: '15', textEn: 'Fall seven times and stand up eight.', textNe: 'सात पटक लडेपछि आठौं पटक उठ्नुस्।', author: 'Japanese Proverb', category: 'Motivation' },
  { id: '16', textEn: 'If you tell the truth, you do not have to remember anything.', textNe: 'यदि तपाईं सत्य बोल्नुहुन्छ भने, तपाईंले केही सम्झनु पर्दैन।', author: 'Mark Twain', category: 'Wisdom' },
  { id: '17', textEn: 'To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.', textNe: 'तपाईंलाई अरू नै बनाउन खोज्ने संसारमा आफू जस्तो छ त्यस्तै हुनु नै सबैभन्दा ठूलो उपलब्धि हो।', author: 'Ralph Waldo Emerson', category: 'Life' },
  { id: '18', textEn: 'It is never too late to be what you might have been.', textNe: 'तपाईं जे बन्न सक्नुहुन्थ्यो, त्यो बन्न कहिल्यै ढिलो हुँदैन।', author: 'George Eliot', category: 'Motivation' },
  { id: '19', textEn: 'Everything you can imagine is real.', textNe: 'तपाईंले कल्पना गर्न सक्ने सबै कुरा वास्तविक हुन्।', author: 'Pablo Picasso', category: 'Life' },
  { id: '20', textEn: 'Where there is love there is life.', textNe: 'जहाँ माया छ, त्यहाँ जीवन छ।', author: 'Mahatma Gandhi', category: 'Love' },
  { id: '21', textEn: 'Keep your face always toward the sunshine—and shadows will fall behind you.', textNe: 'आफ्नो अनुहार सधैँ उज्यालोतिर फर्काउनुहोस्—छायाँ तपाईंको पछाडि पर्नेछ।', author: 'Walt Whitman', category: 'Success' },
  { id: '22', textEn: 'The only true wisdom is in knowing you know nothing.', textNe: 'एकमात्र साँचो बुद्धि भनेको आफूलाई केही थाहा छैन भन्ने जान्नु हो।', author: 'Socrates', category: 'Wisdom' },
  { id: '23', textEn: 'Hardships often prepare ordinary people for an extraordinary destiny.', textNe: 'कठिनाइहरूले अक्सर साधारण मानिसहरूलाई असाधारण गन्तव्यको लागि तयार पार्छन्।', author: 'C.S. Lewis', category: 'Motivation' },
  { id: '24', textEn: 'Do what you can, with what you have, where you are.', textNe: 'तपाईंसँग जे छ, त्यही लिएर, जहाँ हुनुहुन्छ, सक्ने जति गर्नुस्।', author: 'Theodore Roosevelt', category: 'Success' },
  { id: '25', textEn: 'A room without books is like a body without a soul.', textNe: 'किताब नभएको कोठा आत्मा नभएको शरीर जस्तै हो।', author: 'Marcus Tullius Cicero', category: 'Wisdom' },
  { id: '26', textEn: 'Be the change that you wish to see in the world.', textNe: 'तपाईं संसारमा जुन परिवर्तन हेर्न चाहनुहुन्छ, त्यो परिवर्तन आफैँमा ल्याउनुहोस्।', author: 'Mahatma Gandhi', category: 'Life' },
  { id: '27', textEn: 'Happiness depends upon ourselves.', textNe: 'खुशी हामी आफैंमा निर्भर हुन्छ।', author: 'Aristotle', category: 'Life' },
  { id: '28', textEn: 'Not how long, but how well you have lived is the main thing.', textNe: 'तपाईं कति लामो बाँच्नुभयो होइन, कति राम्रोसँग बाँच्नुभयो भन्ने कुरा मुख्य हो।', author: 'Seneca', category: 'Life' },
  { id: '29', textEn: 'Action is the foundational key to all success.', textNe: 'कर्म नै सबै सफलताको आधारभूत साँचो हो।', author: 'Pablo Picasso', category: 'Success' },
  { id: '30', textEn: 'You only live once, but if you do it right, once is enough.', textNe: 'बाँच्ने एकपटक हो, तर राम्रोसँग बाँच्ने हो भने एकपटक नै पर्याप्त हुन्छ।', author: 'Mae West', category: 'Life' },
  { id: '31', textEn: 'The purpose of our lives is to be happy.', textNe: 'हाम्रो जीवनको उद्देश्य खुशी हुनु हो।', author: 'Dalai Lama', category: 'Life' },
  { id: '32', textEn: 'Life is really simple, but we insist on making it complicated.', textNe: 'जीवन वास्तवमै सरल छ, तर हामी यसलाई जटिल बनाउन जोड दिन्छौं।', author: 'Confucius', category: 'Life' },
  { id: '33', textEn: 'May you live all the days of your life.', textNe: 'तपाईं आफ्नो जीवनका सबै दिनहरू बाँच्न सक्नुहोस्।', author: 'Jonathan Swift', category: 'Life' },
  { id: '34', textEn: 'Life itself is the most wonderful fairy tale.', textNe: 'जीवन आफैमा सबैभन्दा अद्भुत परी कथा हो।', author: 'Hans Christian Andersen', category: 'Life' },
  { id: '35', textEn: 'Do not let making a living prevent you from making a life.', textNe: 'जीविकोपार्जनले तपाईंलाई जीवन जिउनबाट रोक्न नदिनुहोस्।', author: 'John Wooden', category: 'Life' },
  { id: '36', textEn: 'Life is a long lesson in humility.', textNe: 'जीवन विनम्रताको लामो पाठ हो।', author: 'James M. Barrie', category: 'Wisdom' },
  { id: '37', textEn: 'In three words I can sum up everything I have learned about life: it goes on.', textNe: 'तीन शब्दहरूमा मैले जीवनको बारेमा सिकेका सबै कुरा संक्षेप गर्न सक्छु: यो चलिरहन्छ।', author: 'Robert Frost', category: 'Wisdom' },
  { id: '38', textEn: 'The successful warrior is the average man, with laser-like focus.', textNe: 'सफल योद्धा लेजर-जस्तो ध्यान भएको साधारण मानिस हो।', author: 'Bruce Lee', category: 'Success' },
  { id: '39', textEn: 'Those who dare to fail miserably can achieve greatly.', textNe: 'जसले नराम्ररी असफल हुने साहस गर्छन्, तिनीहरूले ठूलो उपलब्धि हासिल गर्न सक्छन्।', author: 'John F. Kennedy', category: 'Success' },
  { id: '40', textEn: 'It is hard to fail, but it is worse never to have tried to succeed.', textNe: 'असफल हुनु गाह्रो छ, तर सफल हुन कहिल्यै प्रयास नगर्नु अझ खराब छ।', author: 'Theodore Roosevelt', category: 'Success' },
  { id: '41', textEn: 'I find that the harder I work, the more luck I seem to have.', textNe: 'मैले जति धेरै मेहनत गर्छु, त्यति नै धेरै भाग्य पाएको जस्तो लाग्छ।', author: 'Thomas Jefferson', category: 'Motivation' },
  { id: '42', textEn: 'Success usually comes to those who are too busy to be looking for it.', textNe: 'सफलता प्रायः ती व्यक्तिहरूलाई आउँछ जुन यसको खोजी गर्न धेरै व्यस्त हुन्छन्।', author: 'Henry David Thoreau', category: 'Success' },
  { id: '43', textEn: 'Don\'t be distracted by criticism. Remember, the only taste of success some people get is to take a bite out of you.', textNe: 'आलोचनाबाट विचलित नहुनुहोस्। याद गर्नुहोस्, केही मानिसहरूले सफलताको स्वाद तब मात्र पाउँछन् जब उनीहरूले तपाईंलाई निचा देखाउँछन्।', author: 'Zig Ziglar', category: 'Motivation' },
  { id: '44', textEn: 'Love is a serious mental disease.', textNe: 'प्रेम एउटा गम्भीर मानसिक रोग हो।', author: 'Plato', category: 'Love' },
  { id: '45', textEn: 'A loving heart is the truest wisdom.', textNe: 'मायालु हृदय नै साँचो बुद्धि हो।', author: 'Charles Dickens', category: 'Love' },
  { id: '46', textEn: 'There is always some madness in love. But there is also always some reason in madness.', textNe: 'प्रेममा सधैं केही पागलपन हुन्छ। तर पागलपनमा सधैं केही कारण पनि हुन्छ।', author: 'Friedrich Nietzsche', category: 'Love' },
  { id: '47', textEn: 'We love the things we love for what they are.', textNe: 'हामी जे कुरालाई माया गर्छौं, त्यो जस्तो छ त्यस्तै माया गर्छौं।', author: 'Robert Frost', category: 'Love' },
  { id: '48', textEn: 'You are never too old to set another goal or to dream a new dream.', textNe: 'अर्को लक्ष्य निर्धारण गर्न वा नयाँ सपना देख्नको लागि तपाईं कहिल्यै बुढो हुनुहुन्न।', author: 'C.S. Lewis', category: 'Motivation' },
  { id: '49', textEn: 'Try not to become a man of success. Rather become a man of value.', textNe: 'सफल मानिस बन्ने प्रयास नगर्नुहोस्। बरु मूल्यवान मानिस बन्नुहोस्।', author: 'Albert Einstein', category: 'Wisdom' },
  { id: '50', textEn: 'The way to get started is to quit talking and begin doing.', textNe: 'सुरु गर्ने तरिका भनेको कुरा गर्न छोड्नु र काम सुरु गर्नु हो।', author: 'Walt Disney', category: 'Motivation' }
];
