import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import './Help.css'; // Ensure this CSS file exists for styling

const translations = {
    English: {
        help: "Help",
        faq: "Frequently Asked Questions (FAQ)",
        contactSupport: "Contact Support",
        email: "Email:",
        supportHours: "Support Hours:",
        goHome: "Go Home",
        categories: {
            "Login Issues": [
                { question: "What happens if I forget my password?", answer: "You can use the 'Reset Password' option." },
            ],
            "Settings": [
                { question: "How can I change my notification preferences?", answer: "Change the notification preferences via the Settings menu." },
                { question: "How do I switch to dark mode?", answer: "Switch to Dark Mode via the Settings menu." },
                { question: "How do I update my language preferences?", answer: "Go to 'Settings' > 'Language Preferences'." },
                { question: "How can I modify privacy settings?", answer: "You can adjust your privacy settings via the Settings menu." },
            ],
            "Profile Settings": [
                { question: "How can I update my profile information?", answer: "Click on 'Edit Profile' in the Profile page." },
                { question: "How do I reset my password?", answer: "Visit 'Profile' and then select 'Reset Password'." },
            ],
            "Daily View": [
                { question: "How do I view past moods?", answer: "Go to 'History' or 'Daily View' from the home screen." },
            ],
            "Onboarding": [
                { question: "What happens during onboarding?", answer: "You'll be guided through each of the app's core features." },
                { question: "Can I revisit the onboarding later?", answer: <>Yes, via the <Link id="help-link" to="/onboarding">link</Link> here.</> },
            ],
        }
    },
    Spanish: {
        help: "Ayuda",
        faq: "Preguntas Frecuentes (FAQ)",
        contactSupport: "Contacto de Soporte",
        email: "Correo Electrónico:",
        supportHours: "Horario de Atención:",
        goHome: "Volver al Inicio",
        categories: {
            "Problemas de Inicio de Sesión": [
                { question: "¿Qué pasa si olvido mi contraseña?", answer: "Puede usar la opción 'Restablecer contraseña'." },
            ],
            "Configuración": [
                { question: "¿Cómo puedo cambiar mis preferencias de notificaciones?", answer: "Cambie las preferencias de notificaciones en el menú Configuración." },
                { question: "¿Cómo cambio al modo oscuro?", answer: "Cambie al modo oscuro en el menú Configuración." },
                { question: "¿Cómo actualizo mis preferencias de idioma?", answer: "Vaya a 'Configuración' > 'Preferencias de Idioma'." },
                { question: "¿Cómo puedo modificar la configuración de privacidad?", answer: "Puede ajustar la configuración de privacidad en el menú Configuración." },
            ],
            "Configuración de Perfil": [
                { question: "¿Cómo puedo actualizar la información de mi perfil?", answer: "Haga clic en 'Editar Perfil' en la página de Perfil." },
                { question: "¿Cómo puedo restablecer mi contraseña?", answer: "Visite 'Perfil' y seleccione 'Restablecer Contraseña'." },
            ],
            "Vista Diaria": [
                { question: "¿Cómo veo los estados de ánimo pasados?", answer: "Vaya a 'Historial' o 'Vista Diaria' desde la pantalla de inicio." },
            ],
            "Incorporación": [
                { question: "¿Qué sucede durante la incorporación?", answer: "Se te guiará por cada una de las funciones principales de la aplicación." },
                { question: "¿Puedo volver a hacer la incorporación más tarde?", answer: <>Sí, a través del <Link id="help-link" to="/onboarding">enlace</Link> aquí.</> },
            ],
        }
    },
    German: {
        help: "Helfen",
        faq: "Häufig gestellte Fragen (FAQ)",
        contactSupport: "Kontaktieren Sie den Support",
        email: "Email:",
        supportHours: "Supportzeiten:",
        goHome: "Zur Startseite",
        categories: {
            "Anmeldeprobleme": [
                { question: "Was passiert, wenn ich mein Passwort vergesse?", answer: "Sie können die Option 'Passwort zurücksetzen' verwenden." },
            ],
            "Einstellungen": [
                { question: "Wie kann ich meine Benachrichtigungseinstellungen ändern?", answer: "Ändern Sie die Benachrichtigungseinstellungen im Einstellungsmenü." },
                { question: "Wie wechsle ich in den Dunkelmodus?", answer: "Wechseln Sie über das Einstellungsmenü in den Dunkelmodus." },
                { question: "Wie aktualisiere ich meine Spracheinstellungen?", answer: "Gehen Sie zu 'Einstellungen' > 'Spracheinstellungen'." },
                { question: "Wie kann ich die Datenschutzeinstellungen ändern?", answer: "Sie können die Datenschutzeinstellungen im Einstellungsmenü anpassen." },
            ],
            "Profileinstellungen": [
                { question: "Wie kann ich meine Profilinformationen aktualisieren?", answer: "Klicken Sie auf 'Profil bearbeiten' auf der Profilseite." },
                { question: "Wie kann ich mein Passwort zurücksetzen?", answer: "Besuchen Sie 'Profil' und wählen Sie 'Passwort zurücksetzen'." },
            ],
            "Tägliche Ansicht": [
                { question: "Wie kann ich vergangene Stimmungen anzeigen?", answer: "Gehen Sie zu 'Verlauf' oder 'Tägliche Ansicht' vom Startbildschirm aus." },
            ],
            "Einführung": [
                { question: "Was passiert während der Einführung?", answer: "Du wirst durch die wichtigsten Funktionen der App geführt." },
                { question: "Kann ich die Einführung später erneut durchlaufen?", answer: <>Ja, über den <Link id="help-link" to="/onboarding">link</Link> hier.</> },
            ],
        }
    },
    French: {
        help: "Aide",
        faq: "Questions Fréquemment Posées (FAQ)",
        contactSupport: "Contacter le Support",
        email: "Email:",
        supportHours: "Heures d'assistance:",
        goHome: "Retour à l'accueil",
        categories: {
            "Problèmes de Connexion": [
                { question: "Que se passe-t-il si j'oublie mon mot de passe ?", answer: "Vous pouvez utiliser l'option 'Réinitialiser le mot de passe'." },
            ],
            "Paramètres": [
                { question: "Comment puis-je modifier mes préférences de notification ?", answer: "Modifiez les préférences de notification via le menu Paramètres." },
                { question: "Comment passer en mode sombre ?", answer: "Passez en mode sombre via le menu Paramètres." },
                { question: "Comment mettre à jour mes préférences linguistiques ?", answer: "Allez dans 'Paramètres' > 'Préférences linguistiques'." },
                { question: "Comment puis-je modifier les paramètres de confidentialité ?", answer: "Vous pouvez ajuster vos paramètres de confidentialité via le menu Paramètres." },
            ],
            "Paramètres du Profil": [
                { question: "Comment puis-je mettre à jour les informations de mon profil ?", answer: "Cliquez sur 'Modifier le profil' dans la page de profil." },
                { question: "Comment puis-je réinitialiser mon mot de passe ?", answer: "Visitez 'Profil' puis sélectionnez 'Réinitialiser le mot de passe'." },
            ],
            "Vue Quotidienne": [
                { question: "Comment consulter les humeurs passées ?", answer: "Allez dans 'Historique' ou 'Vue Quotidienne' depuis l'écran d'accueil." },
            ],
            "Intégration": [
                { question: "Que se passe-t-il lors de l'intégration?", answer: "Vous serez guidé à travers chacune des fonctionnalités principales de l'application." },
                { question: "Puis-je revenir à l'intégration plus tard?", answer: <>Oui, via le <Link id="help-link" to="/onboarding">lien</Link> ici.</> },
            ],
        }
    },
    Chinese: {
        help: "帮助",
        faq: "常见问题 (FAQ)",
        contactSupport: "联系支持",
        email: "电子邮件:",
        supportHours: "支持时间:",
        goHome: "回到主页",
        categories: {
            "登录问题": [
                { question: "如果我忘记密码会怎样？", answer: "您可以使用 '重置密码' 选项。" },
            ],
            "设置": [
                { question: "我如何更改通知首选项？", answer: "通过设置菜单更改通知首选项。" },
                { question: "我如何切换到黑暗模式？", answer: "通过设置菜单切换到黑暗模式。" },
                { question: "如何更新我的语言偏好？", answer: "转到 '设置' > '语言偏好'。" },
                { question: "我如何修改隐私设置？", answer: "您可以通过设置菜单调整隐私设置。" },
            ],
            "个人资料设置": [
                { question: "如何更新我的个人信息？", answer: "点击 '编辑个人资料' 在个人资料页面。" },
                { question: "如何重置我的密码？", answer: "访问 '个人资料' 并选择 '重置密码'。" },
            ],
            "每日视图": [
                { question: "如何查看过去的心情？", answer: "从主页进入 '历史记录' 或 '每日视图'。" },
            ],
            "入职/引导": [
                { question: "在入职期间会发生什么？", answer: "你将会被引导了解该应用程序的每个核心功能。" },
                { question: "我可以稍后重新查看入职过程吗？", answer: <>是的，通过此处的 <Link id="help-link" to="/onboarding">链接</Link> 。</> },
            ],
        }
    },
};

function Help({ theme, language }) {
    // State to manage which category and FAQ is expanded
    const [expandedCategory, setExpandedCategory] = useState(null);
    const [expandedFaq, setExpandedFaq] = useState(null);

    const t = translations[language] || translations.English;

    // Using the exact provided questions and answers
    const categories = {
        "Login Issues": [
            { question: "What happens if I forget my password?", answer: "You can use the 'Reset Password' option." },
        ],
        "Settings": [
            { question: "How can I change my notification preferences?", answer: "Change the notification preferences via the Settings menu." },
            { question: "How do I switch to dark mode?", answer: "Switch to Dark Mode via the Settings menu." },
            { question: "How do I update my language preferences?", answer: "Go to 'Settings' > 'Language Preferences'." },
            { question: "How can I modify privacy settings?", answer: "You can adjust your privacy settings via the Settings menu." },
        ],
        "Profile Settings": [
            { question: "How can I update my profile information?", answer: "Click on 'Edit Profile' in the Profile page." },
            { question: "How do I reset my password?", answer: "Visit 'Profile' and then select 'Reset Password'." },
        ],
        "Daily View": [
            { question: "How do I view past moods?", answer: "Go to 'History' or 'Daily View' from the home screen." },
        ],
        "Onboarding": [
            { question: "What happens during onboarding?", answer: "You'll be guided through each of the app's core features." },
            { question: "Can I revisit the onboarding later?", answer: <>Yes, via the <Link id="help-link" to="/onboarding">link</Link> here.</> },
        ],
    };

    useEffect(() => {
        document.body.className = theme; // Update the body class to match the theme
    }, [theme]);

    // Toggle expanded category
    const toggleCategory = (category) => {
        setExpandedCategory(expandedCategory === category ? null : category);
        setExpandedFaq(null); // Reset FAQ expansion when category changes
    };

    // Toggle expanded FAQ
    const toggleFaq = (category, index) => {
        const key = `${category}-${index}`;
        setExpandedFaq(expandedFaq === key ? null : key);
    };

    return (
        <div className= { `help-container ${theme}` }>
            <h1 style={{ marginBottom: '20px', textAlign: 'center' }}>{t.help}</h1>

            <div style={{ margin: '0 auto', maxWidth: '800px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                {/* FAQ Section */}
                <div style={{ flex: '1', marginRight: '20px' }}>
                    <h2 className="custom-header">{t.faq}</h2>

                    {Object.keys(t.categories).map((category, catIndex) => (
                        <div key={catIndex} style={{ marginBottom: '20px' }}>
                            <h3 style={{ marginBottom: '10px', cursor: 'pointer' }} onClick={() => toggleCategory(category)}>
                                {category}
                                <span style={{ marginLeft: '10px' }}>{expandedCategory === category ? '▼' : '►'}</span>
                            </h3>

                            {expandedCategory === category && (
                                <ul style={{ listStyle: 'none', padding: '0', fontSize: '15px' }}>
                                    {t.categories[category].map((faq, index) => (
                                        <li key={index} style={{ marginBottom: '10px', cursor: 'pointer', borderBottom: '1px dashed #fff', paddingBottom: '5px' }} onClick={() => toggleFaq(category, index)}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                {faq.question}
                                                <span>{expandedFaq === `${category}-${index}` ? '▼' : '►'}</span>
                                            </div>
                                            {expandedFaq === `${category}-${index}` && (
                                                <div style={{ marginTop: '5px', paddingLeft: '20px', color: '#ddd' }}>{faq.answer}</div>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))}
                </div>

                {/* Contact Support Section */}
                <div style={{ flex: '1', marginLeft: '20px' }}>
                    <h2 className="custom-header">{t.contactSupport}</h2>
                    <p style={{ margin: '10px 0', fontSize: '15px' }}><u>{t.email}</u> support@emotelog.com</p>
                    <p style={{ margin: '10px 0', fontSize: '15px' }}><u>{t.supportHours}</u> Available from 9am-5pm.</p>
                </div>
            </div>

            <div style={{ marginTop: '15px', textAlign: 'center' }}>
                <Link to="/">
                    <button className="button">{t.goHome}</button>
                </Link>
            </div>
        </div>
    );
}

export default Help;