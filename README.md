
# Ataturk Quotes API

[Deno](https://deno.land) ve [Hono](https://hono.dev) kullanılarak oluşturulan bir Rest API hizmeti, [WikiQuote](https://wikiquote.org)'den Mustafa Kemal Atatürk'ün söylediği ve Atatürk hakkında söylenen sözleri kazıyarak json olarak kaydetmiştir. Bu hizmet, rastgele, tümünü veya istediğiniz bir kimliği belirterek tek bir söz olarak geri alabileceğiniz bir söz servisidir. Ayrıca, sözlerin kaynakları da hizmette mevcuttur ve kaynakları tümü veya tek olarak alabilirsiniz.

[Sözlerin bulunduğu sayfa.](https://tr.wikiquote.org/wiki/Mustafa_Kemal_Atat%C3%BCrk)
## API Kullanımı

#### Random söz ve o söze ait kaynakları getirir

```http
  GET /
```

Örnek Url : [https://ataturk.deno.dev/](https://ataturk.deno.dev/)

#### Tüm söylenmiş sözleri getirir

```http
  GET /quotes
```

Örnek Url : [https://ataturk.deno.dev/quotes](https://ataturk.deno.dev/quotes)

#### Tüm kaynakları getirir

```http
  GET /sources
```

Örnek Url : [https://ataturk.deno.dev/sources](https://ataturk.deno.dev/sources)

#### Belitrilen id ait sözü getirir

```http
  GET /quotes/${id}
```

| Parametre | Tip     | Açıklama                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Gerekli**. Çağrılacak öğenin anahtar değeri |

Örnek Url : [https://ataturk.deno.dev/quotes/18](https://ataturk.deno.dev/quotes/18)

#### Verilen id lere ait kaynakları getirir

```http
  GET /sources/${ids}
```

| Parametre | Tip     | Açıklama                       |
| :-------- | :------- | :-------------------------------- |
| `ids`      | `string[]` | **Gerekli**. Çağrılacak öğenin anahtar değeri |

Örnek Url : [https://ataturk.deno.dev/sources/30,49](https://ataturk.deno.dev/sources/30,49)

  
## Lisans

[MIT](https://choosealicense.com/licenses/mit/) - ibodev1

  