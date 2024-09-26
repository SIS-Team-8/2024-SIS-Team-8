import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import './Help.css'; // Ensure this CSS file exists for styling

const translations = {
    English: {
        faq: "Frequently Asked Questions (FAQ)",
        contactSupport: "Contact Support",
        email: "Email:",
        supportHours: "Support Hours:",
        goHome: "Go Home",
        categories: {
            "Login Issues": [
                { question: "Why can't I log in?", answer: "Please check your credentials or/and your internet connection." },
                { question: "What happens if I forget my password?", answer: "You can use the 'Reset Password' option." },
            ],
            "Settings": [
                { question: "How can I change my notification preferences?", answer: "Change the notification preferences via the Settings menu." },
                { question: "How do I switch to dark mode?", answer: "Switch to Dark Mode via the Settings menu." },
                { question: "How do I update my language preferences?", answer: "Go to 'Settings' > 'Language Preferences'." },
                { question: "How can I modify privacy settings?", answer: "You can adjust your privacy settings via the Settings menu." },
            ],
            "Support and Help": [
                { question: "How can I contact customer support?", answer: "Contact the support team, using the contact details listed in the Help page." },
                { question: "What to do if my account is hacked?", answer: "Contact the support team as soon as possible." },
                { question: "How can I view the help guide?", answer: "Visit the 'Help' section for detailed guides." },
            ],
            "Profile Settings": [
                { question: "How can I update my profile information?", answer: "Click on 'Edit Profile' in the Profile page." },
                { question: "How can I change my email address?", answer: "Go to 'Profile' > 'Edit Profile'." },
                { question: "How do I reset my password?", answer: "Visit 'Profile' and then select 'Reset Password'." },
            ],
            "Daily View": [
                { question: "How do I log today's mood?", answer: "Click 'Log Daily Emotion' on the home screen." },
                { question: "How do I view past moods?", answer: "Go to 'History' or 'Daily View' from the home screen." },
            ],
            "Logout": [
                { question: "How do I confirm logout?", answer: "Click 'Confirm Logout' to exit the session." },
                { question: "Can I cancel logout?", answer: "Yes, select 'Cancel' to return to the home screen." },
            ],
        }
    },
    Spanish: {
        faq: "Preguntas Frecuentes (FAQ)",
        contactSupport: "Contacto de Soporte",
        email: "Correo Electrónico:",
        supportHours: "Horario de Atención:",
        goHome: "Volver al Inicio",
        categories: {
            "Problemas de Inicio de Sesión": [
                { question: "¿Por qué no puedo iniciar sesión?", answer: "Verifique sus credenciales o su conexión a Internet." },
                { question: "¿Qué pasa si olvido mi contraseña?", answer: "Puede usar la opción 'Restablecer contraseña'." },
            ],
            "Configuración": [
                { question: "¿Cómo puedo cambiar mis preferencias de notificaciones?", answer: "Cambie las preferencias de notificaciones en el menú Configuración." },
                { question: "¿Cómo cambio al modo oscuro?", answer: "Cambie al modo oscuro en el menú Configuración." },
                { question: "¿Cómo actualizo mis preferencias de idioma?", answer: "Vaya a 'Configuración' > 'Preferencias de Idioma'." },
                { question: "¿Cómo puedo modificar la configuración de privacidad?", answer: "Puede ajustar la configuración de privacidad en el menú Configuración." },
            ],
            "Soporte y Ayuda": [
                { question: "¿Cómo puedo contactar al soporte?", answer: "Contacte al equipo de soporte utilizando los datos de contacto en la página de Ayuda." },
                { question: "¿Qué hago si mi cuenta ha sido hackeada?", answer: "Contacte al equipo de soporte lo antes posible." },
                { question: "¿Cómo puedo ver la guía de ayuda?", answer: "Visite la sección de 'Ayuda' para guías detalladas." },
            ],
            "Configuración de Perfil": [
                { question: "¿Cómo puedo actualizar la información de mi perfil?", answer: "Haga clic en 'Editar Perfil' en la página de Perfil." },
                { question: "¿Cómo puedo cambiar mi dirección de correo electrónico?", answer: "Vaya a 'Perfil' > 'Editar Perfil'." },
                { question: "¿Cómo puedo restablecer mi contraseña?", answer: "Visite 'Perfil' y seleccione 'Restablecer Contraseña'." },
            ],
            "Vista Diaria": [
                { question: "¿Cómo registro mi estado de ánimo de hoy?", answer: "Haga clic en 'Registrar Estado de Ánimo Diario' en la pantalla de inicio." },
                { question: "¿Cómo veo los estados de ánimo pasados?", answer: "Vaya a 'Historial' o 'Vista Diaria' desde la pantalla de inicio." },
            ],
            "Cerrar Sesión": [
                { question: "¿Cómo confirmo el cierre de sesión?", answer: "Haga clic en 'Confirmar Cierre de Sesión' para salir de la sesión." },
                { question: "¿Puedo cancelar el cierre de sesión?", answer: "Sí, seleccione 'Cancelar' para volver a la pantalla de inicio." },
            ],
        }
    },
    German: {
        faq: "Häufig gestellte Fragen (FAQ)",
        contactSupport: "Kontaktieren Sie den Support",
        email: "Email:",
        supportHours: "Supportzeiten:",
        goHome: "Zur Startseite",
        categories: {
            "Anmeldeprobleme": [
                { question: "Warum kann ich mich nicht anmelden?", answer: "Bitte überprüfen Sie Ihre Anmeldedaten oder Ihre Internetverbindung." },
                { question: "Was passiert, wenn ich mein Passwort vergesse?", answer: "Sie können die Option 'Passwort zurücksetzen' verwenden." },
            ],
            "Einstellungen": [
                { question: "Wie kann ich meine Benachrichtigungseinstellungen ändern?", answer: "Ändern Sie die Benachrichtigungseinstellungen im Einstellungsmenü." },
                { question: "Wie wechsle ich in den Dunkelmodus?", answer: "Wechseln Sie über das Einstellungsmenü in den Dunkelmodus." },
                { question: "Wie aktualisiere ich meine Spracheinstellungen?", answer: "Gehen Sie zu 'Einstellungen' > 'Spracheinstellungen'." },
                { question: "Wie kann ich die Datenschutzeinstellungen ändern?", answer: "Sie können die Datenschutzeinstellungen im Einstellungsmenü anpassen." },
            ],
            "Support und Hilfe": [
                { question: "Wie kann ich den Kundensupport kontaktieren?", answer: "Kontaktieren Sie das Support-Team, indem Sie die Kontaktdaten auf der Hilfeseite verwenden." },
                { question: "Was soll ich tun, wenn mein Konto gehackt wurde?", answer: "Kontaktieren Sie das Support-Team so schnell wie möglich." },
                { question: "Wie kann ich den Hilfsleitfaden anzeigen?", answer: "Besuchen Sie den Abschnitt 'Hilfe' für detaillierte Anleitungen." },
            ],
            "Profileinstellungen": [
                { question: "Wie kann ich meine Profilinformationen aktualisieren?", answer: "Klicken Sie auf 'Profil bearbeiten' auf der Profilseite." },
                { question: "Wie kann ich meine E-Mail-Adresse ändern?", answer: "Gehen Sie zu 'Profil' > 'Profil bearbeiten'." },
                { question: "Wie kann ich mein Passwort zurücksetzen?", answer: "Besuchen Sie 'Profil' und wählen Sie 'Passwort zurücksetzen'." },
            ],
            "Tägliche Ansicht": [
                { question: "Wie protokolliere ich die heutige Stimmung?", answer: "Klicken Sie auf 'Tägliche Stimmung aufzeichnen' auf dem Startbildschirm." },
                { question: "Wie kann ich vergangene Stimmungen anzeigen?", answer: "Gehen Sie zu 'Verlauf' oder 'Tägliche Ansicht' vom Startbildschirm aus." },
            ],
            "Abmeldung": [
                { question: "Wie bestätige ich die Abmeldung?", answer: "Klicken Sie auf 'Abmeldung bestätigen', um die Sitzung zu beenden." },
                { question: "Kann ich die Abmeldung abbrechen?", answer: "Ja, wählen Sie 'Abbrechen', um zum Startbildschirm zurückzukehren." },
            ],
        }
    },
    French: {
        faq: "Questions Fréquemment Posées (FAQ)",
        contactSupport: "Contacter le Support",
        email: "Email:",
        supportHours: "Heures d'assistance:",
        goHome: "Retour à l'accueil",
        categories: {
            "Problèmes de Connexion": [
                { question: "Pourquoi ne puis-je pas me connecter ?", answer: "Veuillez vérifier vos identifiants ou votre connexion Internet." },
                { question: "Que se passe-t-il si j'oublie mon mot de passe ?", answer: "Vous pouvez utiliser l'option 'Réinitialiser le mot de passe'." },
            ],
            "Paramètres": [
                { question: "Comment puis-je modifier mes préférences de notification ?", answer: "Modifiez les préférences de notification via le menu Paramètres." },
                { question: "Comment passer en mode sombre ?", answer: "Passez en mode sombre via le menu Paramètres." },
                { question: "Comment mettre à jour mes préférences linguistiques ?", answer: "Allez dans 'Paramètres' > 'Préférences linguistiques'." },
                { question: "Comment puis-je modifier les paramètres de confidentialité ?", answer: "Vous pouvez ajuster vos paramètres de confidentialité via le menu Paramètres." },
            ],
            "Support et Aide": [
                { question: "Comment puis-je contacter le support client ?", answer: "Contactez l'équipe de support en utilisant les coordonnées figurant sur la page d'aide." },
                { question: "Que faire si mon compte est piraté ?", answer: "Contactez l'équipe de support dès que possible." },
                { question: "Comment puis-je consulter le guide d'aide ?", answer: "Visitez la section 'Aide' pour des guides détaillés." },
            ],
            "Paramètres du Profil": [
                { question: "Comment puis-je mettre à jour les informations de mon profil ?", answer: "Cliquez sur 'Modifier le profil' dans la page de profil." },
                { question: "Comment puis-je changer mon adresse e-mail ?", answer: "Allez dans 'Profil' > 'Modifier le profil'." },
                { question: "Comment puis-je réinitialiser mon mot de passe ?", answer: "Visitez 'Profil' puis sélectionnez 'Réinitialiser le mot de passe'." },
            ],
            "Vue Quotidienne": [
                { question: "Comment enregistrer mon humeur du jour ?", answer: "Cliquez sur 'Enregistrer l'émotion quotidienne' sur l'écran d'accueil." },
                { question: "Comment consulter les humeurs passées ?", answer: "Allez dans 'Historique' ou 'Vue Quotidienne' depuis l'écran d'accueil." },
            ],
            "Déconnexion": [
                { question: "Comment confirmer la déconnexion ?", answer: "Cliquez sur 'Confirmer la déconnexion' pour quitter la session." },
                { question: "Puis-je annuler la déconnexion ?", answer: "Oui, sélectionnez 'Annuler' pour revenir à l'écran d'accueil." },
            ],
        }
    },
    Chinese: {
        faq: "常见问题 (FAQ)",
        contactSupport: "联系支持",
        email: "电子邮件:",
        supportHours: "支持时间:",
        goHome: "回到主页",
        categories: {
            "登录问题": [
                { question: "为什么我无法登录？", answer: "请检查您的凭据或您的互联网连接。" },
                { question: "如果我忘记密码会怎样？", answer: "您可以使用 '重置密码' 选项。" },
            ],
            "设置": [
                { question: "我如何更改通知首选项？", answer: "通过设置菜单更改通知首选项。" },
                { question: "我如何切换到黑暗模式？", answer: "通过设置菜单切换到黑暗模式。" },
                { question: "如何更新我的语言偏好？", answer: "转到 '设置' > '语言偏好'。" },
                { question: "我如何修改隐私设置？", answer: "您可以通过设置菜单调整隐私设置。" },
            ],
            "支持和帮助": [
                { question: "如何联系客户支持？", answer: "使用帮助页面上列出的联系方式联系支持团队。" },
                { question: "如果我的帐户被黑了怎么办？", answer: "尽快联系支持团队。" },
                { question: "如何查看帮助指南？", answer: "访问 '帮助' 部分以获取详细指南。" },
            ],
            "个人资料设置": [
                { question: "如何更新我的个人信息？", answer: "点击 '编辑个人资料' 在个人资料页面。" },
                { question: "如何更改我的电子邮件地址？", answer: "转到 '个人资料' > '编辑个人资料'。" },
                { question: "如何重置我的密码？", answer: "访问 '个人资料' 并选择 '重置密码'。" },
            ],
            "每日视图": [
                { question: "如何记录今天的心情？", answer: "点击主页上的 '记录每日情绪'。" },
                { question: "如何查看过去的心情？", answer: "从主页进入 '历史记录' 或 '每日视图'。" },
            ],
            "登出": [
                { question: "如何确认登出？", answer: "点击 '确认登出' 退出会话。" },
                { question: "我可以取消登出吗？", answer: "是的，选择 '取消' 返回主页。" },
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
            { question: "Why can't I log in?", answer: "Please check your credentials or/and your internet connection." },
            { question: "What happens if I forget my password?", answer: "You can use the 'Reset Password' option." },
        ],
        "Settings": [
            { question: "How can I change my notification preferences?", answer: "Change the notification preferences via the Settings menu." },
            { question: "How do I switch to dark mode?", answer: "Switch to Dark Mode via the Settings menu." },
            { question: "How do I update my language preferences?", answer: "Go to 'Settings' > 'Language Preferences'." },
            { question: "How can I modify privacy settings?", answer: "You can adjust your privacy settings via the Settings menu." },
        ],
        "Support and Help": [
            { question: "How can I contact customer support?", answer: "Contact the support team, using the contact details listed in the Help page." },
            { question: "What to do if my account is hacked?", answer: "Contact the support team as soon as possible." },
            { question: "How can I view the help guide?", answer: "Visit the 'Help' section for detailed guides." },
        ],
        "Profile Settings": [
            { question: "How can I update my profile information?", answer: "Click on 'Edit Profile' in the Profile page." },
            { question: "How can I change my email address?", answer: "Go to 'Profile' > 'Edit Profile'." },
            { question: "How do I reset my password?", answer: "Visit 'Profile' and then select 'Reset Password'." },
        ],
        "Daily View": [
            { question: "How do I log today's mood?", answer: "Click 'Log Daily Emotion' on the home screen." },
            { question: "How do I view past moods?", answer: "Go to 'History' or 'Daily View' from the home screen." },
        ],
        "Logout": [
            { question: "How do I confirm logout?", answer: "Click 'Confirm Logout' to exit the session." },
            { question: "Can I cancel logout?", answer: "Yes, select 'Cancel' to return to the home screen." },
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
            <h1 style={{ marginBottom: '20px', textAlign: 'center' }}>{t.Help}</h1>

            <div style={{ margin: '0 auto', maxWidth: '800px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                {/* FAQ Section */}
                <div style={{ flex: '1', marginRight: '20px' }}>
                    <h2 className="custom-header">Frequently Asked Questions (FAQ)</h2>

                    {Object.keys(categories).map((category, catIndex) => (
                        <div key={catIndex} style={{ marginBottom: '20px' }}>
                            <h3 style={{ marginBottom: '10px', cursor: 'pointer' }} onClick={() => toggleCategory(category)}>
                                {category}
                                <span style={{ marginLeft: '10px' }}>{expandedCategory === category ? '▼' : '►'}</span>
                            </h3>

                            {expandedCategory === category && (
                                <ul style={{ listStyle: 'none', padding: '0', fontSize: '15px' }}>
                                    {categories[category].map((faq, index) => (
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
                    <h2 className="custom-header">Contact Support</h2>
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