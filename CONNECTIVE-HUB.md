# Connective Hub — Ekosistem Notu

`thediagnostic` daha büyük bir dijital sağlık portföyünün parçasıdır.
Portföy genelindeki strateji, paylaşılabilir altyapı kararları ve
projeler-arası entegrasyon planı **merkezi olarak
[connective-hub-os](https://github.com/fevzitorun/connective-hub-os)
repo'sunda** tutulur — burası ekosistemin "ana merkezi"dir.

Bu dosya sadece thediagnostic'in o ekosistemdeki yerine dair kısa bir
referanstır; detaylı/güncel plan için connective-hub-os'a bakın.

## Portföydeki projeler

| Repo | Rol |
|---|---|
| **connective-hub-os** | Merkezi hub — ekosistem dokümantasyonu, paylaşılan strateji |
| **thediagnostic** (bu repo) | UK hastaları ↔ Türkiye hastane grupları, medikal turizm brokerlığı |
| **scanbook-uk** | UK görüntüleme randevu platformu (ScanBook) |
| **healdoc.co.uk** | (canlı site, repo henüz paylaşılmadı) |
| **healify.uk / healify-platform** | — |
| **iyidoktor-medprotocol** | — |
| **medicana-os-monorepo** | Klinik/hastane portalı — hastane ve kliniklere satılacak B2B SaaS ürünü |

## thediagnostic'in durumu

- 37 modüllük plan üzerinden çalışılıyor (bkz. [MODULES.md](MODULES.md), [MASTER-PLAN.md](MASTER-PLAN.md))
- FAZ 0 + FAZ 1 tamamlandı (Modül 1-11)

## Olası entegrasyon noktaları (ileride değerlendirilecek)

- Paylaşılan kimlik/SSO
- Paylaşılan AI agent katmanı (triage, rapor özetleme, takip)
- Paylaşılan tasarım sistemi/tokenlar
- scanbook-uk ↔ thediagnostic arası çapraz yönlendirme (UK vs Türkiye görüntüleme)

> Not: Bu projeler henüz erken/MVP aşamasında olduğu için prematüre
> entegrasyon yapılmıyor. Her repo kendi klasöründe sibling (kardeş)
> dizin olarak tutulmalı, birbirinin içine yerleştirilmemeli.
