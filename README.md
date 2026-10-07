# Codnapp web sitesi

Jekyll ile hazırlanmış tek sayfalık şirket sitesi. GitHub Pages üzerinde ek kurulum
gerekmeden çalışır.

## Yayınlama

1. GitHub'da yeni bir **public** repository açın (ör. `codnapp-site`).
2. Bu klasörün içindeki **tüm dosyaları** repository'ye yükleyin
   (`Add file > Upload files` ile sürükleyip bırakabilirsiniz).
3. Repository'de **Settings > Pages** bölümüne gidin.
   *Source* olarak **Deploy from a branch**, branch olarak **main** ve klasör olarak **/ (root)** seçin.
4. Birkaç dakika sonra site `https://KULLANICI-ADI.github.io/REPO-ADI/` adresinde yayında olur.
   Siteyi bu alt adreste yayınlıyorsanız `_config.yml` içinde `baseurl: "/REPO-ADI"` yapın.

## Özel alan adı bağlama

1. Settings > Pages > **Custom domain** alanına alan adınızı yazın (ör. `www.codnapp.com`).
2. Alan adı sağlayıcınızın DNS ayarlarında GitHub'ın belirttiği kayıtları ekleyin
   (`www` için bir CNAME kaydı: `KULLANICI-ADI.github.io`).
3. *Enforce HTTPS* kutusunu işaretleyin.
4. `_config.yml` içindeki `url` değerini yeni adresle güncelleyin ve `baseurl` değerini boş bırakın.

## İçeriği düzenleme

| Ne değişecek | Dosya |
| --- | --- |
| E-posta, telefon, adres, resmi unvan, LinkedIn | `_config.yml` |
| MES modülleri listesi | `_data/moduller.yml` |
| Ortakların adı ve tecrübe bilgisi | `_data/ekip.yml` |
| Başlıklar ve ana metinler | `index.html` |
| Renkler ve yazı tipleri | `assets/css/main.css` (en üstteki `:root` bölümü) |

Dosyayı GitHub'ın web arayüzünde düzenleyip kaydettiğinizde site otomatik güncellenir.

## Yerelde önizleme (isteğe bağlı)

Ruby kuruluysa: `bundle install` ve ardından `bundle exec jekyll serve`.

## Notlar

- Sitedeki "örnek vardiya ekranı" gerçek veri içermez, tanıtım amaçlı bir görseldir ve
  ekranda da bu şekilde belirtilmiştir.
- Yazı tipleri (Barlow Condensed ve IBM Plex Sans, SIL Open Font License) siteyle birlikte
  barındırılır; ziyaretçi tarayıcıları Google gibi harici sunuculara bağlanmaz.
- Site herhangi bir çerez, analiz aracı ya da form içermez.
