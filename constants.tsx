
import { SpellingModule } from './types';

export const MODULES: SpellingModule[] = [
  // --- VARDAGSORD (W1-W4) ---
  {
    id: 'w1', week: 1, category: 'Vardagsord', title: 'De små jättarna',
    description: 'Vi börjar med orden vi använder allra mest. De har inga svåra regler, de bara "är".',
    presentationWords: [{ word: 'och' }, { word: 'jag' }, { word: 'det' }],
    practiceWords: ['och', 'jag', 'det', 'att', 'som', 'han', 'hon', 'inte', 'skall', 'varit'],
    extraWords: ['eller', 'vara', 'alla', 'vid', 'från', 'hade', 'men'],
    detectiveChallenges: [
      { sentence: 'Katten ___ hunden leker.', correctWord: 'och', options: ['och', 'ock'] },
      { sentence: '___ tycker om glass.', correctWord: 'Jag', options: ['Jag', 'Ja'] },
      { sentence: 'Det är ___ roligt.', correctWord: 'inte', options: ['inte', 'ingte'] }
    ],
    diagnosticTest: ['och', 'jag', 'inte', 'skall', 'varit']
  },
  {
    id: 'w2', week: 2, category: 'Vardagsord', title: 'Hjälporden',
    description: 'Ord som hjälper oss att bygga meningar. De låter ibland annorlunda än de stavas.',
    presentationWords: [{ word: 'skulle' }, { word: 'kanske' }, { word: 'måste' }],
    practiceWords: ['skulle', 'kanske', 'eller', 'måste', 'kunde', 'blivit', 'redan', 'något', 'andra', 'varje'],
    extraWords: ['dessa', 'någon', 'aldrig', 'alltid', 'själv', 'genom'],
    detectiveChallenges: [
      { sentence: 'Jag ___ vilja ha en bulle.', correctWord: 'skulle', options: ['skulle', 'skolle'] },
      { sentence: 'Vi kan ___ gå på bio.', correctWord: 'kanske', options: ['kanske', 'kansje'] },
      { sentence: 'Man ___ borsta tänderna.', correctWord: 'måste', options: ['måste', 'måst'] }
    ],
    diagnosticTest: ['skulle', 'kanske', 'blivit', 'redan', 'varje']
  },
  {
    id: 'w3', week: 3, category: 'Vardagsord', title: 'Plats & Tid',
    description: 'Ord som berättar var och när saker händer.',
    presentationWords: [{ word: 'här' }, { word: 'där' }, { word: 'nu' }],
    practiceWords: ['här', 'där', 'nu', 'sedan', 'idag', 'imorgon', 'alltid', 'aldrig', 'ibland', 'ofta'],
    extraWords: ['nyss', 'strax', 'snart', 'bakom', 'framför', 'mellan'],
    detectiveChallenges: [
      { sentence: 'Kom ___ till mig.', correctWord: 'här', options: ['här', 'her'] },
      { sentence: 'Vi ses ___!', correctWord: 'imorgon', options: ['imorgon', 'i morgon'] },
      { sentence: 'Jag äter ___ frukost.', correctWord: 'alltid', options: ['alltid', 'altid'] }
    ],
    diagnosticTest: ['här', 'imorgon', 'alltid', 'aldrig', 'sedan']
  },
  {
    id: 'w4', week: 4, category: 'Vardagsord', title: 'Frågeorden',
    description: 'Alla frågor börjar med dessa ord. Nästan alla börjar på V.',
    presentationWords: [{ word: 'vad' }, { word: 'varför' }, { word: 'vilken' }],
    practiceWords: ['vad', 'varför', 'vilken', 'vem', 'hur', 'när', 'vart', 'vilka', 'var', 'vems'],
    extraWords: ['vilkas', 'varifrån', 'vartåt', 'huruvida', 'närhelst'],
    detectiveChallenges: [
      { sentence: '___ heter du?', correctWord: 'Vad', options: ['Vad', 'Vat'] },
      { sentence: '___ ska vi gå?', correctWord: 'Vart', options: ['Vart', 'Var'] },
      { sentence: '___ kommer du hem?', correctWord: 'När', options: ['När', 'Ner'] }
    ],
    diagnosticTest: ['varför', 'vilken', 'när', 'vart', 'vems']
  },

  // --- VISUELLA MÖNSTER (W5-W8) ---
  {
    id: 'w5', week: 5, category: 'Visuella mönster', title: 'Dubbla LL',
    description: 'Titta på mönstret med två L i slutet. Det låter kort och snabbt!',
    presentationWords: [{ word: 'boll' }, { word: 'snäll' }, { word: 'troll' }],
    practiceWords: ['boll', 'snäll', 'troll', 'kväll', 'kall', 'full', 'hellre', 'ställe', 'snällt', 'kallt'],
    extraWords: ['hylla', 'villa', 'kulle', 'väll', 'pall', 'snille', 'ställt'],
    detectiveChallenges: [
      { sentence: 'Kasta din ___ till mig.', correctWord: 'boll', options: ['boll', 'bol'] },
      { sentence: 'I ___ ska vi äta tacos.', correctWord: 'kväll', options: ['kväll', 'kväl'] },
      { sentence: 'Vara ___ mot andra.', correctWord: 'snäll', options: ['snäll', 'snäl'] }
    ],
    diagnosticTest: ['boll', 'snäll', 'hellre', 'ställe', 'kväll']
  },
  {
    id: 'w6', week: 6, category: 'Visuella mönster', title: 'Mönstret -TION',
    description: 'Många ord som slutar på -tion låter som "shon". Det är ett vanligt mönster.',
    presentationWords: [{ word: 'station' }, { word: 'lektion' }, { word: 'information' }],
    practiceWords: ['station', 'lektion', 'information', 'operation', 'portion', 'motion', 'situation', 'tradition', 'redaktion', 'reaktion'],
    extraWords: ['funktion', 'produktion', 'inspektion', 'kollektion', 'tionde'],
    detectiveChallenges: [
      { sentence: 'Tåget står på ___en.', correctWord: 'station', options: ['station', 'stasjon'] },
      { sentence: 'Nu börjar vår ___ i matte.', correctWord: 'lektion', options: ['lektion', 'lexion'] },
      { sentence: 'Vi behöver mer ___.', correctWord: 'information', options: ['information', 'informasjon'] }
    ],
    diagnosticTest: ['station', 'lektion', 'information', 'portion', 'motion']
  },
  {
    id: 'w7', week: 7, category: 'Visuella mönster', title: 'Dubbla MM & NN',
    description: 'Mönster där konsonanten dubblas i mitten av ordet.',
    presentationWords: [{ word: 'hemma' }, { word: 'stanna' }, { word: 'vinna' }],
    practiceWords: ['hemma', 'panna', 'stanna', 'dimma', 'glömma', 'vinna', 'kunna', 'brinna', 'tunna', 'gömma'],
    extraWords: ['lamma', 'stimma', 'damma', 'känna', 'bränna', 'spänna'],
    detectiveChallenges: [
      { sentence: 'Jag vill gå ___.', correctWord: 'hemma', options: ['hemma', 'hema'] },
      { sentence: 'Kan du ___ den här låten?', correctWord: 'glömma', options: ['glömma', 'glöma'] }
    ],
    diagnosticTest: ['hemma', 'stanna', 'vinna', 'glömma', 'tunna']
  },
  {
    id: 'w8', week: 8, category: 'Visuella mönster', title: 'Mönstret -SION',
    description: 'Liknar -tion men används i andra ord. Titta noga på bokstäverna!',
    presentationWords: [{ word: 'diskussion' }, { word: 'explosion' }, { word: 'television' }],
    practiceWords: ['diskussion', 'explosion', 'television', 'version', 'vision', 'division', 'revision', 'pension', 'mission', 'passion'],
    extraWords: ['invasion', 'precision', 'illusion', 'expansion', 'provision'],
    detectiveChallenges: [
      { sentence: 'Vi hade en bra ___.', correctWord: 'diskussion', options: ['diskussion', 'diskution'] },
      { sentence: 'Titta på ___ på kvällen.', correctWord: 'television', options: ['television', 'televisjon'] }
    ],
    diagnosticTest: ['diskussion', 'explosion', 'television', 'version', 'pension']
  },

  // --- ORD-FAMILJER (W9-W12) ---
  {
    id: 'w9', week: 9, category: 'Ord-familjer', title: 'Släkten Ä (A->Ä)',
    description: 'Många ord med Ä är släkt med ord som har A.',
    presentationWords: [{ word: 'vän' }, { word: 'hämta' }, { word: 'tänka' }],
    practiceWords: ['vän', 'vänskap', 'hämta', 'hämnd', 'tänka', 'tanke', 'läsa', 'läst', 'rädda', 'kraft'],
    extraWords: ['berätta', 'stämma', 'smälta', 'välta', 'släppa'],
    detectiveChallenges: [
      { sentence: 'Min bästa ___ heter Sam.', correctWord: 'vän', options: ['vän', 'ven'] },
      { sentence: 'Kan du ___ bollen?', correctWord: 'hämta', options: ['hämta', 'hemta'] }
    ],
    diagnosticTest: ['vän', 'vänskap', 'hämta', 'tänka', 'berätta']
  },
  {
    id: 'w10', week: 10, category: 'Ord-familjer', title: 'Släkten Ö (O->Ö)',
    description: 'Här letar vi efter släktingar med O för att veta om det ska vara Ö.',
    presentationWords: [{ word: 'följa' }, { word: 'döma' }, { word: 'lösa' }],
    practiceWords: ['följa', 'följe', 'döma', 'dom', 'lösa', 'loss', 'drömma', 'dröm', 'sköta', 'skott'],
    extraWords: ['höra', 'hörsel', 'störa', 'stök', 'rörig', 'ror'],
    detectiveChallenges: [
      { sentence: 'Vill du ___ med hem?', correctWord: 'följa', options: ['följa', 'följa'] },
      { sentence: 'Jag hade en konstig ___.', correctWord: 'dröm', options: ['dröm', 'dröm'] }
    ],
    diagnosticTest: ['följa', 'döma', 'lösa', 'drömma', 'sköta']
  },
  {
    id: 'w11', week: 11, category: 'Ord-familjer', title: 'Sammansatta ord',
    description: 'När två ord blir ett. Titta på skarven mellan orden.',
    presentationWords: [{ word: 'glasskål' }, { word: 'matchhjälte' }, { word: 'busshållplats' }],
    practiceWords: ['glasskål', 'matchhjälte', 'busshållplats', 'fotbollslag', 'kvällstidning', 'nattåg', 'skolväska', 'matbord', 'solglasögon', 'vinterjacka'],
    extraWords: ['cykelhjälm', 'pannkaka', 'blåbärssylt', 'tågbiljett', 'skrivbord'],
    detectiveChallenges: [
      { sentence: 'Vi äter ur en ___.', correctWord: 'glasskål', options: ['glasskål', 'glaskål'] },
      { sentence: 'Tåget kallas för ___.', correctWord: 'nattåg', options: ['nattåg', 'natåg'] }
    ],
    diagnosticTest: ['glasskål', 'matchhjälte', 'busshållplats', 'nattåg', 'solglasögon']
  },
  {
    id: 'w12', week: 12, category: 'Ord-familjer', title: 'Släkten Å (A/O->Å)',
    description: 'Sista delen i ord-familjer fokuserar på Å-ljudet.',
    presentationWords: [{ word: 'lång' }, { word: 'mål' }, { word: 'gång' }],
    practiceWords: ['lång', 'längre', 'mål', 'måla', 'gång', 'gånger', 'hålla', 'hållt', 'många', 'mängd'],
    extraWords: ['stång', 'stänger', 'tång', 'tänger', 'mångfald'],
    detectiveChallenges: [
      { sentence: 'Vägen är mycket ___.', correctWord: 'lång', options: ['lång', 'lång'] },
      { sentence: 'Hur många ___ har du sprungit?', correctWord: 'gånger', options: ['gånger', 'gånger'] }
    ],
    diagnosticTest: ['lång', 'längre', 'gånger', 'många', 'mängd']
  },

  // --- LÅNEORD & VANLIGA FEL (W13-W16) ---
  {
    id: 'w13', week: 13, category: 'Låneord & Vanliga fel', title: 'De luriga orden',
    description: 'Dessa ord stavas nästan aldrig som de låter. Fokus på det visuella!',
    presentationWords: [{ word: 'egentligen' }, { word: 'cykel' }, { word: 'intervju' }],
    practiceWords: ['egentligen', 'cykel', 'intervju', 'abonnemang', 'parallell', 'noggrant', 'rekommendera', 'intressant', 'visserligen', 'definitivt'],
    extraWords: ['medicin', 'restaurang', 'chaufför', 'dessert', 'entré'],
    detectiveChallenges: [
      { sentence: 'Det är ___ ganska enkelt.', correctWord: 'egentligen', options: ['egentligen', 'ejentligen'] },
      { sentence: 'Boken var mycket ___.', correctWord: 'intressant', options: ['intressant', 'intresant'] }
    ],
    diagnosticTest: ['egentligen', 'cykel', 'intervju', 'intressant', 'noggrant']
  },
  {
    id: 'w14', week: 14, category: 'Låneord & Vanliga fel', title: 'Franska & Engelska lån',
    description: 'Ord som kommit utifrån men som vi använder varje dag.',
    presentationWords: [{ word: 'design' }, { word: 'mail' }, { word: 'scooter' }],
    practiceWords: ['design', 'mail', 'scooter', 'computer', 'weekend', 'manager', 'match', 'träning', 'sport', 'team'],
    extraWords: ['garage', 'pjäs', 'entré', 'dessert', 'parfym'],
    detectiveChallenges: [
      { sentence: 'Jag skickar ett ___ till dig.', correctWord: 'mail', options: ['mail', 'mejl'] },
      { sentence: 'Vårt ___ vann matchen.', correctWord: 'team', options: ['team', 'tim'] }
    ],
    diagnosticTest: ['design', 'mail', 'scooter', 'weekend', 'manager']
  },
  {
    id: 'w15', week: 15, category: 'Låneord & Vanliga fel', title: 'Dubbelteckning X',
    description: 'Ord där man ofta glömmer eller lägger till en extra bokstav i onödan.',
    presentationWords: [{ word: 'alltid' }, { word: 'aldrig' }, { word: 'hellre' }],
    practiceWords: ['alltid', 'aldrig', 'hellre', 'ställe', 'snällt', 'kallt', 'fullt', 'visst', 'människor', 'berätta'],
    extraWords: ['cykla', 'tappa', 'hoppa', 'sprungit', 'kommit'],
    detectiveChallenges: [
      { sentence: 'Jag har ___ varit där.', correctWord: 'aldrig', options: ['aldrig', 'aldrig'] },
      { sentence: 'Kan du ___ en saga?', correctWord: 'berätta', options: ['berätta', 'berätta'] }
    ],
    diagnosticTest: ['alltid', 'aldrig', 'hellre', 'människor', 'berätta']
  },
  {
    id: 'w16', week: 16, category: 'Låneord & Vanliga fel', title: 'Den stora finalen',
    description: 'Vi repeterar de allra svåraste mönstren från hela terminen.',
    presentationWords: [{ word: 'station' }, { word: 'egentligen' }, { word: 'vänskap' }],
    practiceWords: ['station', 'egentligen', 'vänskap', 'intressant', 'diskussion', 'hämta', 'skulle', 'kanske', 'boll', 'cykel'],
    extraWords: ['lektion', 'information', 'tänka', 'måste', 'varit'],
    detectiveChallenges: [
      { sentence: 'Tåget har lämnat ___en.', correctWord: 'station', options: ['station', 'stasjon'] },
      { sentence: 'Det är ___ roligt att stava.', correctWord: 'egentligen', options: ['egentligen', 'ejentligen'] }
    ],
    diagnosticTest: ['station', 'egentligen', 'intressant', 'diskussion', 'vänskap']
  }
];
