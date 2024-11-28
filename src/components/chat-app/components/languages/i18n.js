import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                translation: {
                    "newChat": "New chat",
                    "docs": "Docs",
                    "settings": "Settings",
                    "theme": "Theme",
                    "language": "Language",
                    "greeting": "Hello",
                    "topic": "What's the subject for today?",
                    "cards": {
                        "budget": "Give me a step-by-step guide on creating a monthly budget and tracking expenses",
                        "routine": "Help me develop a morning routine that will boost productivity and energy levels",
                        "stress": "Show me effective techniques for managing stress and anxiety in the workplace"
                    },
                    "warning": "Nexus may make mistakes. Please double-check its responses.",
                    "ask": "Ask"
                  }
            },

            fr: {
                translation: {
                    "newChat": "Nouvelle discussion",
                    "docs": "Documentation",
                    "settings": "Paramètres",
                    "theme": "Thème",
                    "language": "Langue",
                    "greeting": "Bonjour",
                    "topic": "Quel est le sujet d'aujourd'hui?",
                    "cards": {
                        "budget": "Donne-moi un guide étape par étape pour créer un budget mensuel et suivre les dépenses",
                        "routine": "Aide-moi à développer une routine matinale qui augmentera la productivité et le niveau d'énergie",
                        "stress": "Montre-moi des techniques efficaces pour gérer le stress et l'anxiété au travail"
                    },
                    "warning": "Nexus peut faire des erreurs. Veuillez vérifier ses réponses.",
                    "ask": "Demande"
                }
            },

            nl: {
                translation: {
                    "newChat": "Nieuwe chat",
                    "docs": "Documentatie",
                    "settings": "Instellingen",
                    "theme": "Thema",
                    "language": "Taal",
                    "greeting": "Hallo",
                    "topic": "Wat is de onderwerp \n voor vandaag?",
                    "cards": {
                        "budget": "Geef me een stapsgewijze handleiding voor het opstellen van een maandelijks budget en het bijhouden van uitgaven",
                        "routine": "Help me een ochtendroutine te ontwikkelen die de productiviteit en energieniveaus verhoogt",
                        "stress": "Toon me effectieve technieken voor het omgaan met stress en angst op de werkplek"
                    },
                    "warning": "Nexus kan fouten maken. Controleer zijn antwoorden alstublieft.",
                    "ask": "Vraag"
                }
            }
        },
        fallbackLng: 'en',
    })

export default i18n;