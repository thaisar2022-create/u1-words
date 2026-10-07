import { VocabularyItem, CategoryType, ToneType } from '../types/vocabulary';

export const CATEGORIES: { id: CategoryType; label: string }[] = [
  { id: "အားလုံး", label: "အားလုံး (All)" },
  { id: "နာမ်စား", label: "နာမ်စား (Pronouns)" },
  { id: "မိသားစု", label: "မိသားစု (Family)" },
  { id: "ကြိယာ", label: "ကြိယာ (Verbs)" },
  { id: "နာမ်", label: "နာမ် (Nouns)" },
  { id: "သိမှတ်ဖွယ်ရာ", label: "သိမှတ်ဖွယ်ရာ (Phrases & Basics)" },
];

export const TONE_DETAILS: Record<ToneType, { label: string; burmeseLabel: string; thaiLabel: string; pitch: string; color: string; desc: string }> = {
  "Mid Tone": {
    label: 'Mid Tone',
    burmeseLabel: 'အလယ်သံ (သာမန်သံ)',
    thaiLabel: 'เสียงสามัญ',
    pitch: '33 (Level flat pitch)',
    color: 'bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-950/40 dark:text-sky-300 dark:border-sky-800',
    desc: 'ပုံမှန်အလယ်အလတ်အသံဖြင့် ပြန့်ပြန့်လေး ရွတ်ဆိုရသည် (ဥပမာ: မာ - လာသည်)'
  },
  "Low Tone": {
    label: 'Low Tone',
    burmeseLabel: 'အသံနိမ့် (အောက်မြစ်သံနှင့်တူ)',
    thaiLabel: 'เสียงเอก',
    pitch: '21 (Low falling pitch)',
    color: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800',
    desc: 'အသံကို အောက်သို့နှိမ့်ချကာ အောက်မြစ်သံကဲ့သို့ တိုတိုလေး ရွတ်ဆိုရသည် (ဥပမာ: ဖော့ - အဖေ)'
  },
  "Falling Tone": {
    label: 'Falling Tone',
    burmeseLabel: 'အသံနိမ့်ဆင်း (သက်သံ)',
    thaiLabel: 'เสียงโท',
    pitch: '51 (High-to-low emphatic)',
    color: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800',
    desc: 'အမြင့်မှ အနိမ့်သို့ စိုက်ဆင်းပြီး အလေးအနက် အသံဖိထွက်ရသည် (ဥပမာ: ခေါက်(ဝ်) - ထမင်း)'
  },
  "High Tone": {
    label: 'High Tone',
    burmeseLabel: 'အသံမြင့် (ဝစ္စပေါက်သံနီးပါး)',
    thaiLabel: 'เสียงตรี',
    pitch: '45 (High rising pitch)',
    color: 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-800',
    desc: 'အသံကို မြင့်မြင့်လေး ထားရွတ်ဆိုရသည် (ဥပမာ: နော(င်) - ညီ/မောင်/နှမ)'
  },
  "Rising Tone": {
    label: 'Rising Tone',
    burmeseLabel: 'အသံမြင့်ဆွဲ (တက်သံ)',
    thaiLabel: 'เสียงจัตวา',
    pitch: '24 (Low-to-high scoop)',
    color: 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800',
    desc: 'မေးခွန်းမေးသလို အသံနိမ့်ရာမှ အပေါ်သို့ ဆွဲတင်ရွတ်ဆိုရသည် (ဥပမာ: ဖုန်(မ်) - ကျွန်တော်)'
  }
};

export const TONE_CONSONANT_RULES = [
  {
    class: 'အလယ်ဗျည်း (Mid Consonants - อักษรกลาง)',
    thaiSymbols: 'ก จ ฎ ฏ ด ต บ ป อ',
    count: '၉ လုံး',
    mnemonic: 'ไก่จิกเด็กตายเด็กตายบนปากโอ่ง',
    ruleDesc: 'အသံ ၅ သံလုံး (สามัญ, เอก, โท, ตรี, จัตวา) ကို အပြည့်အဝ ပြောင်းလဲရွတ်ဆိုနိုင်သည့် အခြေခံဗျည်းအုပ်စုဖြစ်သည်။'
  },
  {
    class: 'အမြင့်ဗျည်း (High Consonants - อักษรสูง)',
    thaiSymbols: 'ข ฃ ฉ ฐ ถ ผ ฝ ศ ษ ส ห',
    count: '၁၁ လုံး',
    mnemonic: 'ผีฝากถุงข้าวสารให้ฉัน',
    ruleDesc: 'မူလအသံမှာ တက်သံ (จัตวา) ဖြစ်ပြီး၊ အသံ ၃ သံ (เอก, โท, จัตวา) သာ ပြောင်းလဲရွတ်ဆိုနိုင်သည်။'
  },
  {
    class: 'အနိမ့်ဗျည်း (Low Consonants - อักษรต่ำ)',
    thaiSymbols: 'ค ฅ ฆ ง ช ซ ฌ ญ ฑ ฒ ณ ท ธ น พ ฟ ภ ม ย ร ล ว ฬ ฮ',
    count: '၂၄ လုံး (အတွဲ ၁၄ + တစ်ကိုယ်တော် ၁၀)',
    mnemonic: 'ကွဲပြားသော အနိမ့်ဗျည်း ၂ မျိုးရှိသည်',
    ruleDesc: 'မူလအသံမှာ သာမန်သံ (สามัญ) ဖြစ်ပြီး၊ ၎င်းနောက်တွင် အသံအမှတ်အသားများ ထည့်ပါက အသံတစ်ဆင့်စီ မြင့်တက်သွားသည်။'
  }
];

export const VOCABULARY_DATA: VocabularyItem[] = [
  // ----------------------------------------------------
  // (က) နာမ်စားများ (Pronouns - คำสรรพนาม)
  // ----------------------------------------------------
  { id: 1, thai: "ผม", phonetic: "/phom/", myanmarReading: "ဖုန်(မ်)", meaning: "ကျွန်တော် (အမျိုးသားသုံး)", category: "နာမ်စား", tone: "Rising Tone", toneMyanmar: "အသံမြင့်ဆွဲ" },
  { id: 2, thai: "ดิฉัน", phonetic: "/dì-chán/", myanmarReading: "ဒီချန်(န်)", meaning: "ကျွန်မ (အမျိုးသမီးသုံး ယဉ်ကျေးစကား)", category: "နာမ်စား", tone: "High Tone", toneMyanmar: "အသံမြင့်" },
  { id: 3, thai: "ฉัน", phonetic: "/chán/", myanmarReading: "ချန်(န်)", meaning: "ငါ / ကျုပ် / ကျွန်ုပ်", category: "နာမ်စား", tone: "High Tone", toneMyanmar: "အသံမြင့်" },
  { id: 4, thai: "กู", phonetic: "/kuu/", myanmarReading: "ကူး", meaning: "ကျုပ် / ငါ (Informal)", category: "နာမ်စား", tone: "Mid Tone", toneMyanmar: "အလယ်သံ" },
  { id: 5, thai: "เรา", phonetic: "/raw/", myanmarReading: "ရောင်(ဝ်) / လောင်(ဝ်)", meaning: "ငါတို့ / ကျွန်ုပ် / တို့", category: "နာမ်စား", tone: "Mid Tone", toneMyanmar: "အလယ်သံ" },
  { id: 6, thai: "คุณ", phonetic: "/khun/", myanmarReading: "ခူ(န်)", meaning: "သင် / မင်း / ရှင် / ခင်ဗျား", category: "နာမ်စား", tone: "Mid Tone", toneMyanmar: "အလယ်သံ" },
  { id: 7, thai: "เธอ", phonetic: "/thəə/", myanmarReading: "ထေ", meaning: "မင်း / သူမ", category: "နာမ်စား", tone: "Mid Tone", toneMyanmar: "အလယ်သံ" },
  { id: 8, thai: "มึง", phonetic: "/mʉŋ/", myanmarReading: "မင်(င်)", meaning: "နင်", category: "နာမ်စား", tone: "Mid Tone", toneMyanmar: "အလယ်သံ" },
  { id: 9, thai: "แก", phonetic: "/kɛɛ/", myanmarReading: "ကဲ", meaning: "သူ (Informal) / နင်", category: "နာမ်စား", tone: "Mid Tone", toneMyanmar: "အလယ်သံ" },
  { id: 10, thai: "เขา", phonetic: "/kháw/", myanmarReading: "ခေါင်(ဝ်)", meaning: "သူ / သူမ", category: "နာမ်စား", tone: "High Tone", toneMyanmar: "အသံမြင့်" },
  { id: 11, thai: "พวกเขา", phonetic: "/phûak-kháw/", myanmarReading: "ဖုဝက်(က်)ခေါင်(ဝ်)", meaning: "သူတို့", category: "နာမ်စား", tone: "Falling Tone", toneMyanmar: "အသံနိမ့်ဆင်း" },
  { id: 12, thai: "ท่าน", phonetic: "/thâan/", myanmarReading: "ထာန့်(န်)", meaning: "လူကြီးမင်း / အရှင်", category: "နာမ်စား", tone: "Falling Tone", toneMyanmar: "အသံနိမ့်ဆင်း" },
  { id: 13, thai: "มัน", phonetic: "/man/", myanmarReading: "မန်(န်)", meaning: "၎င်း / ဒါ (တိရစ္ဆာန်/အရာဝတ္ထု)", category: "နာမ်စား", tone: "Mid Tone", toneMyanmar: "အလယ်သံ" },

  // ----------------------------------------------------
  // (ခ) မိသားစုဝင်များ (Family & Relatives)
  // ----------------------------------------------------
  { id: 14, thai: "พ่อ", phonetic: "/phɔ̂ɔ/", myanmarReading: "ဖော့", meaning: "အဖေ", category: "မိသားစု", tone: "Falling Tone", toneMyanmar: "အသံနိမ့်ဆင်း" },
  { id: 15, thai: "แม่", phonetic: "/mɛ̂ɛ/", myanmarReading: "မဲ့", meaning: "အမေ", category: "မိသားစု", tone: "Falling Tone", toneMyanmar: "အသံနိမ့်ဆင်း" },
  { id: 16, thai: "พี่", phonetic: "/phîi/", myanmarReading: "ဖိ", meaning: "အစ်ကို / အစ်မ", category: "မိသားစု", tone: "Falling Tone", toneMyanmar: "အသံနိမ့်ဆင်း" },
  { id: 17, thai: "น้อง", phonetic: "/nɔ́ɔŋ/", myanmarReading: "နော(င်)", meaning: "ညီ / ညီမ / မောင် / နှမ", category: "မိသားစု", tone: "High Tone", toneMyanmar: "အသံမြင့်" },
  { id: 18, thai: "พี่ชาย", phonetic: "/phîi-chaay/", myanmarReading: "ဖိချိုင်း(ယ်)", meaning: "အစ်ကို", category: "မိသားစု", tone: "Falling Tone", toneMyanmar: "အသံနိမ့်ဆင်း" },
  { id: 19, thai: "พี่สาว", phonetic: "/phîi-săaw/", myanmarReading: "ဖိစောင်(ဝ်)", meaning: "အစ်မ", category: "မိသားစု", tone: "Falling Tone", toneMyanmar: "အသံနိမ့်ဆင်း" },
  { id: 20, thai: "น้องชาย", phonetic: "/nɔ́ɔŋ-chaay/", myanmarReading: "နော(င်)ချိုင်း(ယ်)", meaning: "ညီ / မောင်", category: "မိသားစု", tone: "High Tone", toneMyanmar: "အသံမြင့်" },
  { id: 21, thai: "น้องสาว", phonetic: "/nɔ́ɔŋ-săaw/", myanmarReading: "နော(င်)စောင်(ဝ်)", meaning: "ညီမ / နှမ", category: "မိသားစု", tone: "High Tone", toneMyanmar: "အသံမြင့်" },
  { id: 22, thai: "พี่น้อง", phonetic: "/phîi-nɔ́ɔŋ/", myanmarReading: "ဖိနော(င်)", meaning: "မောင်နှမ", category: "မိသားစု", tone: "Falling Tone", toneMyanmar: "အသံနိမ့်ဆင်း" },
  { id: 23, thai: "ปู่", phonetic: "/pùu/", myanmarReading: "ပူ", meaning: "အဘိုး (အဖေဘက်)", category: "မိသားစု", tone: "Low Tone", toneMyanmar: "အသံနိမ့်" },
  { id: 24, thai: "ย่า", phonetic: "/yâa/", myanmarReading: "ယာ့", meaning: "အဘွား (အဖေဘက်)", category: "မိသားစု", tone: "Falling Tone", toneMyanmar: "အသံနိမ့်ဆင်း" },
  { id: 25, thai: "ตา", phonetic: "/taa/", myanmarReading: "တား", meaning: "အဘိုး (အမေဘက်)", category: "မိသားစု", tone: "Mid Tone", toneMyanmar: "အလယ်သံ" },
  { id: 26, thai: "ยาย", phonetic: "/yaay/", myanmarReading: "ယိုင်(ယ်)", meaning: "အဘွား (အမေဘက်)", category: "မိသားစု", tone: "Mid Tone", toneMyanmar: "အလယ်သံ" },
  { id: 27, thai: "อา", phonetic: "/ʔaa/", myanmarReading: "အား", meaning: "ဦးလေး / ဒေါ်လေး (အဖေဘက်)", category: "မိသားစု", tone: "Mid Tone", toneMyanmar: "အလယ်သံ" },
  { id: 28, thai: "น้า", phonetic: "/náa/", myanmarReading: "နား", meaning: "ဦးလေး / ဒေါ်လေး (အမေဘက်)", category: "မိသားစု", tone: "High Tone", toneMyanmar: "အသံမြင့်" },
  { id: 29, thai: "ลุง", phonetic: "/luŋ/", myanmarReading: "လု(င်)", meaning: "ဦးကြီး (အဖေ/အမေဘက်)", category: "မိသားစု", tone: "Mid Tone", toneMyanmar: "အလယ်သံ" },
  { id: 30, thai: "ป้า", phonetic: "/pâa/", myanmarReading: "ပါ့", meaning: "ကြီးတော် (အဖေ/အမေဘက်)", category: "မိသားစု", tone: "Falling Tone", toneMyanmar: "အသံနိမ့်ဆင်း" },
  { id: 31, thai: "ญาติ", phonetic: "/yâat/", myanmarReading: "ယာ့(တ်)", meaning: "ဆွေမျိုး", category: "မိသားစု", tone: "Falling Tone", toneMyanmar: "အသံနိမ့်ဆင်း" },
  { id: 32, thai: "ญาติพี่น้อง", phonetic: "/yâat-phîi-nɔ́ɔŋ/", myanmarReading: "ယာ့(တ်)ဖိနော(င်)", meaning: "ဆွေမျိုးမောင်နှမ", category: "မိသားစု", tone: "Falling Tone", toneMyanmar: "အသံနိမ့်ဆင်း" },
  { id: 33, thai: "หลาน", phonetic: "/lăan/", myanmarReading: "လာန်(န်)", meaning: "တူ / တူမ / မြေး", category: "မိသားစု", tone: "Rising Tone", toneMyanmar: "အသံမြင့်ဆွဲ" },

  // ----------------------------------------------------
  // (ဂ) ကြိယာများ (Verbs - คำกริยา)
  // ----------------------------------------------------
  { id: 34, thai: "แนะนำ", phonetic: "/nɛ́-nam/", myanmarReading: "နဲ့နမ်(မ်)", meaning: "မိတ်ဆက်သည်", category: "ကြိယာ", tone: "High Tone", toneMyanmar: "အသံမြင့်" },
  { id: 35, thai: "ทักทาย", phonetic: "/thák-thaay/", myanmarReading: "ထက်(က်)ထိုင်း(ယီ)", meaning: "နှုတ်ဆက်သည်", category: "ကြိယာ", tone: "High Tone", toneMyanmar: "အသံမြင့်" },
  { id: 36, thai: "สบายดี", phonetic: "/sà-baay-dii/", myanmarReading: "စဘိုင်း(ယီ)ဒီး", meaning: "နေကောင်းသည်", category: "ကြိယာ", tone: "Mid Tone", toneMyanmar: "အလယ်သံ" },
  { id: 37, thai: "รู้จัก", phonetic: "/rúu-jàk/", myanmarReading: "ရူးကျက်(က်)", meaning: "သိကျွမ်းသည်", category: "ကြိယာ", tone: "High Tone", toneMyanmar: "အသံမြင့်" },
  { id: 38, thai: "ทำ", phonetic: "/tham/", myanmarReading: "ထမ်(မ်)", meaning: "ပြုလုပ်သည်", category: "ကြိယာ", tone: "Mid Tone", toneMyanmar: "အလယ်သံ" },
  { id: 39, thai: "ให้", phonetic: "/hây/", myanmarReading: "ဟိုက်(ယ်)", meaning: "ပေးသည်", category: "ကြိယာ", tone: "Falling Tone", toneMyanmar: "အသံနိမ့်ဆင်း" },
  { id: 40, thai: "กิน", phonetic: "/kin/", myanmarReading: "ကင်(န်)", meaning: "စားသည်", category: "ကြိယာ", tone: "Mid Tone", toneMyanmar: "အလယ်သံ" },
  { id: 41, thai: "ดื่ม", phonetic: "/dʉ̀ʉm/", myanmarReading: "ဒင်(မ်)", meaning: "သောက်သည်", category: "ကြိယာ", tone: "Low Tone", toneMyanmar: "အသံနိမ့်" },
  { id: 42, thai: "ได้", phonetic: "/dâay/", myanmarReading: "ဒိုက်(ယ်)", meaning: "ရသည်", category: "ကြိယာ", tone: "Falling Tone", toneMyanmar: "အသံနိမ့်ဆင်း" },
  { id: 43, thai: "เอา", phonetic: "/ʔaw/", myanmarReading: "အောင်(ဝ်)", meaning: "ယူသည်", category: "ကြိယာ", tone: "Mid Tone", toneMyanmar: "အလယ်သံ" },
  { id: 44, thai: "มี", phonetic: "/mii/", myanmarReading: "မီ", meaning: "ရှိသည်", category: "ကြိယာ", tone: "Mid Tone", toneMyanmar: "အလယ်သံ" },
  { id: 45, thai: "ชอบ", phonetic: "/chɔ̂ɔp/", myanmarReading: "ချော့(ပ်)", meaning: "ကြိုက်သည်", category: "ကြိယာ", tone: "Falling Tone", toneMyanmar: "အသံနိမ့်ဆင်း" },
  { id: 46, thai: "ซื้อ", phonetic: "/sʉ́ʉ/", myanmarReading: "စေး", meaning: "ဝယ်သည်", category: "ကြိယာ", tone: "High Tone", toneMyanmar: "အသံမြင့်" },
  { id: 47, thai: "ขาย", phonetic: "/khǎay/", myanmarReading: "ခိုင်(ယီ)", meaning: "ရောင်းသည်", category: "ကြိယာ", tone: "Rising Tone", toneMyanmar: "အသံမြင့်ဆွဲ" },
  { id: 48, thai: "ไป", phonetic: "/pay/", myanmarReading: "ပိုင်(ယ်)", meaning: "သွားသည်", category: "ကြိယာ", tone: "Mid Tone", toneMyanmar: "အလယ်သံ" },
  { id: 49, thai: "มา", phonetic: "/maa/", myanmarReading: "မာ", meaning: "လာသည်", category: "ကြိယာ", tone: "Mid Tone", toneMyanmar: "အလယ်သံ" },
  { id: 50, thai: "ใช่", phonetic: "/chây/", myanmarReading: "ချိုက်(ယ်)", meaning: "ဟုတ်သည်", category: "ကြိယာ", tone: "Falling Tone", toneMyanmar: "အသံနိမ့်ဆင်း" },
  { id: 51, thai: "อ่าน", phonetic: "/ʔàan/", myanmarReading: "အာန်(န်)", meaning: "ဖတ်သည်", category: "ကြိယာ", tone: "Low Tone", toneMyanmar: "အသံနိမ့်" },
  { id: 52, thai: "ดีใจ", phonetic: "/dii-jay/", myanmarReading: "ဒီးကျိုင်", meaning: "ဝမ်းသာသည်", category: "ကြိယာ", tone: "Mid Tone", toneMyanmar: "အလယ်သံ" },
  { id: 53, thai: "เจอกัน", phonetic: "/jəə-kan/", myanmarReading: "ကျေကန်(န်)", meaning: "တွေ့ဆုံသည်", category: "ကြိယာ", tone: "Mid Tone", toneMyanmar: "အလယ်သံ" },

  // ----------------------------------------------------
  // (ဃ) နာမ်များ (Nouns - คำนาม)
  // ----------------------------------------------------
  { id: 54, thai: "ข้าว", phonetic: "/khâaw/", myanmarReading: "ခေါက်(ဝ်)", meaning: "ထမင်း", category: "နာမ်", tone: "Falling Tone", toneMyanmar: "အသံနိမ့်ဆင်း" },
  { id: 55, thai: "ส้มตำ", phonetic: "/sôm-tam/", myanmarReading: "စုန့်(မ်)တမ်(မ်)", meaning: "သင်္ဘောသီးထောင်း", category: "နာမ်", tone: "Falling Tone", toneMyanmar: "အသံနိမ့်ဆင်း" },
  { id: 56, thai: "เสื้อ", phonetic: "/sʉ̂a/", myanmarReading: "စွတ်အာ့", meaning: "အင်္ကျီ", category: "နာမ်", tone: "Falling Tone", toneMyanmar: "အသံနိမ့်ဆင်း" },
  { id: 57, thai: "กางเกง", phonetic: "/kaaŋ-keeŋ/", myanmarReading: "ကန်(င်)ကိန်(င်)", meaning: "ဘောင်းဘီ", category: "နာမ်", tone: "Mid Tone", toneMyanmar: "အလယ်သံ" },
  { id: 58, thai: "วีซ่า", phonetic: "/wii-sâa/", myanmarReading: "ဝီစာ့", meaning: "ဗီဇာ", category: "နာမ်", tone: "Falling Tone", toneMyanmar: "အသံနိမ့်ဆင်း" },
  { id: 59, thai: "งาน", phonetic: "/ŋaan/", myanmarReading: "ငါန်း(န်)", meaning: "အလုပ်", category: "နာမ်", tone: "Mid Tone", toneMyanmar: "အလယ်သံ" },
  { id: 60, thai: "ตลาด", phonetic: "/ta-làat/", myanmarReading: "တလာ(တ်)", meaning: "ဈေး", category: "နာမ်", tone: "Low Tone", toneMyanmar: "အသံနိမ့်" },
  { id: 61, thai: "ทะเล", phonetic: "/thá-lee/", myanmarReading: "ထလေး", meaning: "ပင်လယ်", category: "နာမ်", tone: "High Tone", toneMyanmar: "အသံမြင့်" },
  { id: 62, thai: "นาฬิกา", phonetic: "/naa-lí-kaa/", myanmarReading: "နာလိကာ", meaning: "နာရီ", category: "နာမ်", tone: "High Tone", toneMyanmar: "အသံမြင့်" },
  { id: 63, thai: "หนังสือ", phonetic: "/năŋ-sʉ̌ʉ/", myanmarReading: "နန်(င်)စေ", meaning: "စာအုပ်", category: "နာမ်", tone: "Rising Tone", toneMyanmar: "အသံမြင့်ဆွဲ" },

  // ----------------------------------------------------
  // (င) သိမှတ်ဖွယ်ရာ စကားလုံးများနှင့် အခြေခံနှုတ်ဆက်စကားများ
  // ----------------------------------------------------
  { id: 64, thai: "อันนี้", phonetic: "/ʔan-níi/", myanmarReading: "အန်(န်)နီး", meaning: "ဒီအရာ / ဒီဟာ", category: "သိမှတ်ဖွယ်ရာ", tone: "High Tone", toneMyanmar: "အသံမြင့်" },
  { id: 65, thai: "อันนั้น", phonetic: "/ʔan-nán/", myanmarReading: "အန်(န်)နန်း(န်)", meaning: "ဟိုအရာ / ဟိုဟာ", category: "သိမှတ်ဖွယ်ရာ", tone: "High Tone", toneMyanmar: "အသံမြင့်" },
  { id: 66, thai: "ไหม", phonetic: "/máy/", myanmarReading: "မိုင်(ယ်)", meaning: ".....လား / ..... မလား", category: "သိမှတ်ဖွယ်ရာ", tone: "High Tone", toneMyanmar: "အသံမြင့်" },
  { id: 67, thai: "ไม่", phonetic: "/mây/", myanmarReading: "မိုက်(ယ်)", meaning: "မ…..ဘူး", category: "သိမှတ်ဖွယ်ရာ", tone: "Falling Tone", toneMyanmar: "အသံနိမ့်ဆင်း" },
  { id: 68, thai: "อะไร", phonetic: "/ʔa-ray/", myanmarReading: "အရိုင်(ယ်)", meaning: "ဘာလဲ", category: "သိမှတ်ဖွယ်ရာ", tone: "Mid Tone", toneMyanmar: "အလယ်သံ" },
  { id: 69, thai: "เช่นกัน", phonetic: "/chêen-kan/", myanmarReading: "ချေ(န်)ကန်(န်)", meaning: "အတူတူပဲ", category: "သိမှတ်ဖွယ်ရာ", tone: "Falling Tone", toneMyanmar: "အသံနိမ့်ဆင်း" },
  { id: 70, thai: "สวัสดี", phonetic: "/sa-wàt-dii/", myanmarReading: "စဝပ်(တ်)ဒီး", meaning: "မင်္ဂလာပါ", category: "သိမှတ်ဖွယ်ရာ", tone: "Low Tone", toneMyanmar: "အသံနိမ့်" },
  { id: 71, thai: "ขอบคุณ", phonetic: "/khɔ̀ɔp-khun/", myanmarReading: "ခေါ်(ပ်)ခူ(န်)", meaning: "ကျေးဇူးတင်ပါသည်", category: "သိမှတ်ဖွယ်ရာ", tone: "Low Tone", toneMyanmar: "အသံနိမ့်" },
  { id: 72, thai: "ขอโทษ", phonetic: "/khɔ̌ɔ-thôot/", myanmarReading: "ခေါ်ထို့(တ်)", meaning: "တောင်းပန်ပါသည်", category: "သိမှတ်ဖွယ်ရာ", tone: "Rising Tone", toneMyanmar: "အသံမြင့်ဆွဲ" },
  { id: 73, thai: "ไม่เป็นไร", phonetic: "/mây-pen-ray/", myanmarReading: "မိုက်(ယ်)ပင်(န်)ရိုင်(ယ်)", meaning: "ကိစ္စမရှိပါဘူး / ရပါတယ်", category: "သိမှတ်ဖွယ်ရာ", tone: "Falling Tone", toneMyanmar: "အသံနိမ့်ဆင်း" },
  { id: 74, thai: "ลาก่อน", phonetic: "/laa-kɔ̀ɔn/", myanmarReading: "လာကော်(န်)", meaning: "သွားခွင့်ပြုပါဦး / နှုတ်ဆက်ပါတယ်", category: "သိမှတ်ဖွယ်ရာ", tone: "Low Tone", toneMyanmar: "အသံနိမ့်" }
];

// Compatibility alias for any existing reference
export const VOCABULARY_DATABASE = VOCABULARY_DATA;
