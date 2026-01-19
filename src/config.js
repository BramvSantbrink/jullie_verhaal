// Jullie Verhaal - Bruiloft Quiz App Configuratie
// Pas deze waarden aan om de app te personaliseren

export const config = {
  // App naam
  appName: "Jullie Verhaal",

  // Koppel Informatie
  coupleName: "Quirine & Bas",
  weddingDate: "21 februari 2026",
  welcomeMessage: "De quiz van jullie verhaal!",

  // Optioneel: Pad naar foto van het koppel (plaats in public map)
  couplePhoto: "/couple-photo.jpg",

  // Foto's voor de stick figure animatie (plaats in public map)
  // Deze foto's worden op de hoofden van de stick figures geplakt
  couplePhotos: {
    person1: "/person1.jpg", // Linker persoon
    person2: "/person2.jpg"  // Rechter persoon
  },

  // Video positie opties
  videoPositions: {
    before: "Voor de vraag",
    after: "Na de vraag"
  },

  // Uitleg timing opties
  explanationTimings: {
    before: "Voor het beantwoorden",
    after: "Na het beantwoorden"
  },

  // Quiz Instellingen
  quizSettings: {
    shuffleQuestions: true,
    allowRetakes: true
  },

  // Beperkingen
  constraints: {
    maxVideoSizeMB: 10,
    maxVideoDurationSeconds: 30,
    maxQuestionTextLength: 200,
    maxExplanationLength: 300,
    maxPasswordAttempts: 3,
    passwordCooldownMinutes: 5
  },

  // Score Berichten (gebaseerd op percentage)
  scoreMessages: {
    low: {
      threshold: 30,
      message: "Blijf leren over ons! Er valt nog zoveel te ontdekken."
    },
    medium: {
      threshold: 60,
      message: "Niet slecht! Je kent ons best goed."
    },
    high: {
      threshold: 90,
      message: "Indrukwekkend! Je kent ons echt heel goed!"
    },
    perfect: {
      threshold: 100,
      message: "Perfecte score! Je bent een echte vriend(in) van de familie!"
    }
  },

  // UI Teksten
  texts: {
    // Welcome page
    welcome: {
      footer: "Met liefde gemaakt voor onze speciale dag",
      playQuiz: "Speel Quiz",
      submitQuestion: "Stel een Vraag"
    },
    // Quiz page
    quiz: {
      loading: "Quiz laden...",
      score: "Score",
      question: "Vraag",
      of: "van",
      nextQuestion: "Volgende Vraag",
      seeResults: "Bekijk Resultaten",
      noQuestions: "Nog Geen Vragen",
      noQuestionsMessage: "De quiz is nog leeg! Wees de eerste die een vraag indient.",
      submitQuestion: "Stel een Vraag",
      error: "Er ging iets mis",
      tryAgain: "Opnieuw Proberen",
      quizComplete: "Quiz Voltooid!",
      correct: "goed",
      playAgain: "Opnieuw Spelen",
      thanks: "Bedankt voor het spelen van"
    },
    // Upload page
    upload: {
      title: "Vragen Uploaden",
      adminAccess: "Admin Toegang",
      enterPassword: "Voer het wachtwoord in om vragen te uploaden",
      password: "Wachtwoord",
      enter: "Invoeren",
      tooManyAttempts: "Te veel mislukte pogingen",
      pleaseWait: "Wacht even voordat je het opnieuw probeert",
      timeRemaining: "Resterende tijd",
      attemptsRemaining: "pogingen over",
      incorrectPassword: "Onjuist wachtwoord",
      logout: "Uitloggen",
      backToHome: "Terug naar Home",
      submitNewQuestion: "Nieuwe Vraag Indienen",
      question: "Vraag",
      questionPlaceholder: "Voer je quizvraag in...",
      videoClip: "Videoclip",
      videoOptional: "(optioneel)",
      videoPosition: "Video Positie",
      videoPositionHelp: "Wanneer moet de video worden getoond?",
      clickToUpload: "Klik om te uploaden",
      orDragDrop: "of sleep en zet neer",
      videoRequirements: "Alleen MP4, max {size}MB, max {duration} seconden",
      remove: "Verwijderen",
      answerOptions: "Antwoordopties",
      answerOptionsHelp: "Vul alle 4 opties in en selecteer het juiste antwoord",
      answerOption: "Antwoordoptie",
      correct: "Juist",
      optionalFields: "Optionele Velden",
      explanation: "Uitleg / Leuk Weetje",
      explanationPlaceholder: "Voeg een leuk weetje of uitleg toe...",
      explanationTiming: "Uitleg Tonen",
      explanationTimingHelp: "Wanneer moet de uitleg worden getoond?",
      yourName: "Jouw Naam",
      yourNamePlaceholder: "Wie dient deze vraag in?",
      uploading: "Uploaden...",
      submitQuestion: "Vraag Indienen",
      uploadedQuestions: "Geüploade Vragen",
      refresh: "Vernieuwen",
      loadingQuestions: "Vragen laden...",
      noQuestionsYet: "Nog geen vragen geüpload",
      noQuestionsHelp: "Gebruik het formulier hierboven om je eerste vraag toe te voegen!",
      deleteQuestion: "Vraag Verwijderen",
      deleteConfirm: "Vraag Verwijderen?",
      deleteWarning: "Weet je zeker dat je deze vraag wilt verwijderen? Dit verwijdert ook de bijbehorende video. Deze actie kan niet ongedaan worden gemaakt.",
      cancel: "Annuleren",
      delete: "Verwijderen",
      by: "door",
      answers: "Antwoorden",
      questionUploaded: "Vraag succesvol geüpload!",
      fixErrors: "Los de volgende fouten op:",
      characters: "tekens",
      required: "verplicht",
      noVideo: "Geen video",
      videoBefore: "Video voor vraag",
      videoAfter: "Video na vraag",
      preview: "Voorbeeld",
      previewDescription: "Zo ziet je vraag eruit voor de quizspelers",
      showPreview: "Toon Voorbeeld",
      hidePreview: "Verberg Voorbeeld",
      previewNote: "Dit is een voorbeeld. Klik op een antwoord om te zien hoe het eruit ziet na het beantwoorden."
    },
    // Validation messages
    validation: {
      questionRequired: "Vraagtekst is verplicht",
      answerRequired: "Antwoordoptie {num} is verplicht",
      selectCorrectAnswer: "Selecteer het juiste antwoord",
      videoMp4Only: "Video moet in MP4-formaat zijn",
      videoTooLarge: "Video moet kleiner zijn dan {size}MB (huidige: {current}MB)",
      videoTooLong: "Video moet korter zijn dan {duration} seconden (huidige: {current} seconden)",
      questionTooLong: "Vraag moet korter zijn dan {max} tekens (huidige: {current})"
    }
  }
};
