from gtts import gTTS
import os

# Define full greeting messages with corresponding language codes
greetings = {
    "English": ("Welcome to our voice recorder app! Have a good day!", "en"),
    "Hindi": ("हमारे वॉयस रिकॉर्डर ऐप में आपका स्वागत है! आपका दिन शुभ हो!", "hi"),
    "Telugu": ("మా వాయిస్ రికార్డర్ యాప్‌కి స్వాగతం! మీ రోజు మంచి దినమవ్వాలి!", "te"),
    "Spanish": ("¡Bienvenido a nuestra aplicación de grabadora de voz! ¡Que tengas un buen día!", "es"),
    "French": ("Bienvenue dans notre application d'enregistrement vocal ! Passez une bonne journée !", "fr"),
    "German": ("Willkommen in unserer Sprachrekorder-App! Einen schönen Tag noch!", "de"),
    "Tamil": ("எங்கள் குரல் பதிவு பயன்பாட்டிற்கு வரவேற்கிறோம்! உங்கள் நாள் நலமாக இருக்கட்டும்!", "ta"),
    "Kannada": ("ನಮ್ಮ ಧ್ವನಿ ದಾಖಲೆ ಅಪ್ಲಿಕೇಶನ್‌ಗೆ ಸ್ವಾಗತ! ನಿಮ್ಮ ದಿನ ಸುಂದರವಾಗಿರಲಿ!", "kn"),
    "Malayalam": ("ഞങ്ങളുടെ വോയ്‌സ് റെക്കോർഡർ ആപ്പിലേക്ക് സ്വാഗതം! നിങ്ങൾക്ക് നല്ല ദിവസം ആശംസിക്കുന്നു!", "ml"),
    "Arabic": ("مرحبًا بك في تطبيق مسجل الصوت الخاص بنا! نتمنى لك يوما سعيدا!", "ar"),
    "Chinese": ("欢迎使用我们的录音应用程序！祝你有美好的一天！", "zh-CN"),
    "Japanese": ("私たちのボイスレコーダーアプリへようこそ！良い一日を！", "ja"),
    "Russian": ("Добро пожаловать в наше приложение для записи голоса! Хорошего вам дня!", "ru"),
    "Portuguese": ("Bem-vindo ao nosso aplicativo de gravador de voz! Tenha um bom dia!", "pt")
}

# Create a folder to store the audio files
output_folder = "Audio"
os.makedirs(output_folder, exist_ok=True)

# Generate and save the audio files
for language, (message, lang_code) in greetings.items():
    tts = gTTS(text=message, lang=lang_code)
    output_path = os.path.join(output_folder, f"{language}.mp3")
    tts.save(output_path)
    print(f"Saved {language} greeting at: {output_path}")
