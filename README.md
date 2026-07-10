# JavaScript Learning Hub 📚

Modern, interaktif JavaScript öğrenme platformu. Interview soruları ve kod egzersizleri ile JavaScript becerilerinizi geliştirin!

## 🌟 Özellikler

### 📊 Kişisel İlerleme Takibi
- **LocalStorage** ile kalıcı durum yönetimi
- Her soruyu işaretleme: "Anladım", "Tekrar Bakacağım", "Öğrenmedim"
- Detaylı istatistikler ve ilerleme yüzdesi
- Motivasyonel mesajlar

### 🔍 Güçlü Arama ve Filtreleme
- Gerçek zamanlı arama (başlık ve içerikta)
- Tip filtreleme: Interview soruları / Kod egzersizleri
- Durum filtreleme: Öğrenme durumuna göre
- Hızlı filtre butonları

### 💻 Kod Gösterimi
- Syntax highlighting destekli kod blokları
- Tek tıkla kod kopyalama
- Birden fazla kod örneği desteği
- Exercise'lar için ayrı cevap kod blokları

### 📱 Responsive Tasarım
- Mobil ve desktop uyumlu
- Modern, temiz UI/UX
- Tailwind CSS ile stillendirilmiş
- Accessibility (erişilebilirlik) odaklı

### 🚀 Performans
- Next.js App Router
- Client-side navigation
- Optimized JSON data loading
- Sayfalama ile hızlı yükleme

## 📈 İstatistikler

- **476 Interview Sorusu**
- **86 Kod Egzersizi**
- **562 Toplam İçerik**

## 🛠️ Teknolojiler

- **Next.js 15** - React framework
- **Tailwind CSS** - Styling
- **React Hooks** - State management
- **LocalStorage** - Persistent storage
- **JavaScript** - Programming language

## 🚀 Kurulum

\`\`\`bash
# Repository'yi klonlayın
git clone [repository-url]

# Proje klasörüne gidin
cd javascript-learning-app

# Bağımlılıkları yükleyin
npm install

# Development server'ı başlatın
npm run dev
\`\`\`

Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini açın.

## 📝 Kullanım

### Ana Sayfa
- Tüm soruları listeler
- İstatistik kartında ilerlemenizi görün
- Arama ve filtreleme ile istediğiniz içeriği bulun
- Sayfalama ile kolay navigasyon

### Soru Detay Sayfası
- Soru/egzersizin tam içeriğini görün
- Kod örneklerini inceleyin
- Durumunuzu işaretleyin (Anladım/Tekrar/Öğrenmedim)
- Önceki/sonraki soru navigasyonu

### Öğrenme Sistemi
1. **Anladım ✅**: Konuyu kavradığınızı belirtir
2. **Tekrar Bakacağım 📖**: Daha sonra tekrar incelemek istediğiniz konular
3. **Öğrenmedim ❌**: Henüz anlamadığınız konular

## 📊 Veri Yapısı

JSON dosyası şu yapıda organize edilmiştir:

\`\`\`json
{
  "metadata": {
    "totalQuestions": 476,
    "totalExercises": 86,
    "totalItems": 562
  },
  "questions": [...],
  "exercises": [...],
  "allItems": [...]
}
\`\`\`

Her soru/egzersiz şunları içerir:
- Unique ID
- Başlık ve slug
- İçerik/açıklama
- Kod örnekleri
- Tip (interview/exercise)

## 🎯 Roadmap

- [ ] Kategori sistemi (Promises, Closures, vb.)
- [ ] Favoriler özelliği
- [ ] Not alma sistemi
- [ ] İlerleme grafiği
- [ ] Export/Import özelliği
- [ ] Dark mode
- [ ] Çoklu dil desteği

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (\`git checkout -b feature/amazing-feature\`)
3. Commit edin (\`git commit -m 'Add amazing feature'\`)
4. Push edin (\`git push origin feature/amazing-feature\`)
5. Pull Request oluşturun

### ⚠️ Kod Yazım Kuralları

**Yorum satırları kullanılmamalıdır!** Bu projede kod kendi kendini açıklamalıdır:

- ❌ Yorum satırı eklemeyin
- ✅ Anlamlı değişken ve fonksiyon isimleri kullanın
- ✅ Küçük, tek işlevli fonksiyonlar yazın
- ✅ İyi yapılandırılmış component'ler oluşturun

Detaylı bilgi için: [.agent/workflows/coding-conventions.md](.agent/workflows/coding-conventions.md)

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## ❤️ Teşekkürler

Bu proje JavaScript öğrenmek isteyen tüm geliştiriciler için hazırlanmıştır. Happy coding! 🚀