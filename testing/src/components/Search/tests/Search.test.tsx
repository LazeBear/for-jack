import {
  fireEvent,
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { act } from 'react-dom/test-utils';
import Search from '../Search';

const data = {
  status: 'ok',
  totalResults: 54,
  articles: [
    {
      source: {
        id: 'ars-technica',
        name: 'Ars Technica',
      },
      author: 'Ron Amadeo',
      title:
        'The Google Assistant is losing location reminders, one of its best features - Ars Technica',
      description: 'Family reminders are also going away.',
      url: 'https://arstechnica.com/gadgets/2022/06/the-google-assistant-is-losing-location-reminders-one-of-its-best-features/',
      urlToImage:
        'https://cdn.arstechnica.net/wp-content/uploads/2022/06/Google-damaged-crop-760x380.jpg',
      publishedAt: '2022-06-03T17:25:24Z',
      content:
        '87 with 60 posters participating\r\nGoogle is stirring the pot again and removing helpful features from users for no discernible reason. Through various channels, the company announced that reminders f… [+2159 chars]',
    },
    {
      source: {
        id: 'infobae',
        name: 'Infobae',
      },
      author: 'anónimo',
      title:
        'La nueva opción de Microsoft Edge para abrir pestañas que estaban activas en Google Chrome - infobae',
      description:
        'Los usuarios ahora pueden abrir nuevas pestañas en Edge y el navegador transferirá los ajustes del navegador de Google de forma automática',
      url: 'https://www.infobae.com/america/tecno/2022/06/03/la-nueva-opcion-de-microsoft-edge-para-abrir-pestanas-que-estaban-activas-en-google-chrome/',
      urlToImage:
        'https://www.infobae.com/new-resizer/3DnlVmiwAl8WS8qckI-Nnj9MmUk=/1200x628/filters:format(webp):quality(85)//cloudfront-us-east-1.images.arcpublishing.com/infobae/T32CT52QLVFU7PELF3QB4NKRHM.jpeg',
      publishedAt: '2022-06-03T16:47:37Z',
      content:
        'Microsoftquiere que los usuarios deGoogle Chromepuedan migrar fácilmente aMicrosoft Edgey poder hacerlo en cualquier momento. Según el portal Windows Latest, la empresa liderada por Satya Nadella ha … [+3249 chars]',
    },
    {
      source: {
        id: null,
        name: 'Giga',
      },
      author: 'Peter Hryciuk',
      title:
        'Samsung macht Handy-Besitzer glücklich: Brandneues Software-Update ist da - Giga',
      description:
        'Samsung bleibt sich treu und haut ein Software-Update nach dem anderen raus. Noch bevor Google das neue Update für seine Pixel-Smartphones bereitstellt, legt Samsung wieder einmal vor. Interessanterweise nicht für die neuesten Modelle, sondern für die aus dem…',
      url: 'https://www.giga.de/news/samsung-macht-handy-besitzer-gluecklich-brandneues-software-update-ist-da/',
      urlToImage:
        'https://crops.giga.de/76/32/96/71b5c4a4a6e97fd9a611c9e4d7_YyAyODIweDE0NzMrOTArMTA4AnJlIDEyMDAgNjI3AzcyNzVhNjc5MTlk.jpg',
      publishedAt: '2022-06-03T16:24:50Z',
      content:
        'Samsung bleibt sich treu und haut ein Software-Update nach dem anderen raus. Noch bevor Google das neue Update für seine Pixel-Smartphones bereitstellt, legt Samsung wieder einmal vor. Interessanterw… [+1745 chars]',
    },
    {
      source: {
        id: null,
        name: 'Android Authority',
      },
      author: null,
      title:
        "Today's Google is still paying for the mistakes of yesterday's Google - Android Authority",
      description:
        'Google today seems to have more focus and a clear vision, but it is still trying to clean the residual mistakes that it made in the past.',
      url: 'https://www.androidauthority.com/google-today-fixing-mistakes-3172189/',
      urlToImage:
        'https://www.androidauthority.com/wp-content/uploads/2019/07/android-q-beta-5-dark-mode-boot-animation-google-logo.jpg',
      publishedAt: '2022-06-03T15:37:04Z',
      content:
        'This week, Google announced that it will combine Meet and Duo but promised to keep the best features of both video calling apps in the joint venture. News like this isnt surprising anymore. The compa… [+8089 chars]',
    },
    {
      source: {
        id: null,
        name: 'Zive.cz',
      },
      author: 'Lukáš Václavík',
      title:
        'Google Duo skončí, nahradí jej Meet. Mapujeme komplikovanou historii googlovských komunikátorů - Živě.cz',
      description: '',
      url: 'https://www.zive.cz/clanky/google-duo-skonci-nahradi-jej-meet-mapujeme-komplikovanou-historii-googlovskych-komunikatoru/sc-3-a-216801/default.aspx',
      urlToImage:
        'https://www.zive.cz/getthumbnail.aspx?q=100&height=20000&width=20000&id_file=853763488',
      publishedAt: '2022-06-03T14:45:58Z',
      content:
        'Struná zpráva: Google pesune funkce ze sluby Meet do aplikace Duo a Meet zruí. Následn Duo pejmenuje na Meet. Ano, je to zvlátní, ale na to vyznat se v komunikátorech Googlu zkrátka nikdy nestaila po… [+3183 chars]',
    },
    {
      source: {
        id: null,
        name: 'Uol.com.br',
      },
      author: 'Hemerson Brandão',
      title:
        'Fechaduras smart compatíveis com Alexa estão até 27% off na Amazon - Gizmodo Brasil',
      description:
        'Esta semana, a Amazon está com ofertas em fechaduras smart – compatíveis com a Alexa e o Google Assistente --, e os descontos estão entre 15% e 27%. As ofertas...',
      url: 'https://gizmodo.uol.com.br/fechaduras-smart-compativeis-com-alexa-estao-ate-27-off-na-amazon/',
      urlToImage:
        'https://i0.wp.com/gizmodo.uol.com.br/wp-content/blogs.dir/8/files/2022/06/fechaduras-smart-compativeis-com-alexa-estao-ate-27-off-na-Amazon.jpg?fit=1000%2C600&ssl=1',
      publishedAt: '2022-06-03T12:09:38Z',
      content:
        'Esta semana, a Amazon está com ofertas em fechaduras smart compatíveis com a Alexa e o Google Assistente –, e os descontos estão entre 15% e 27%.\r\nAs ofertas são por tempo limitado, com as condições … [+1543 chars]',
    },
    {
      source: {
        id: null,
        name: 'SmartDroid.de',
      },
      author: 'https://www.facebook.com/denny.fischer',
      title: 'Android Auto startet in neuer Version - SmartDroid.de',
      description:
        'Google legt nach dem letzten Release vor ein paar Tagen schon wieder mit der nächsten neuen Version für Android Auto nach.',
      url: 'https://www.smartdroid.de/android-auto-startet-neuer-version/',
      urlToImage:
        'https://www.smartdroid.de/wp-content/uploads/2022/04/android-auto-head.jpg',
      publishedAt: '2022-06-03T11:53:00Z',
      content:
        'Google legt nach dem letzten Release vor ein paar Tagen schon wieder mit der nächsten neuen Version für Android Auto nach. Diesmal ist es laut APK-Name wieder eine fertige Version. Inzwischen sind wi… [+1083 chars]',
    },
    {
      source: {
        id: null,
        name: 'MobileSyrup',
      },
      author: null,
      title:
        "Best Buy's 'June Smart Home Sale Event' offers deals on Google Nest devices and more - MobileSyrup",
      description:
        "Best Buy is kicking off the month with its 'June Smart Home Sale Event' beginning on June 3rd.",
      url: 'https://mobilesyrup.com/2022/06/03/best-buy-june-smart-home-sale-event-google-nest/',
      urlToImage:
        'https://cdn.mobilesyrup.com/wp-content/uploads/2022/06/google-smarthome-speaker-header-scaled-1-scaled.jpeg',
      publishedAt: '2022-06-03T11:00:00Z',
      content: null,
    },
    {
      source: {
        id: null,
        name: 'Xataka.com',
      },
      author: 'Juan Carlos López',
      title:
        'El procesador cuántico fotónico Borealis ha alcanzado la supremacía cuántica. Y ha hecho morder el polvo... - Xataka',
      description:
        'El primer grupo de investigación que anunció haber alcanzado la supremacía cuántica fue el equipo de Google liderado por John Martinis. El artículo científico...',
      url: 'https://www.xataka.com/investigacion/procesador-cuantico-fotonico-borealis-ha-alcanzado-supremacia-cuantica-ha-hecho-morder-polvo-a-demas',
      urlToImage:
        'https://i.blogs.es/d45e37/procesadorcuanticofotonico/840_560.jpeg',
      publishedAt: '2022-06-03T10:01:45Z',
      content:
        'El primer grupo de investigación que anunció haber alcanzado la supremacía cuántica fue el equipo de Google liderado por John Martinis. El artículo científico en el que explicó con detalle cómo había… [+4430 chars]',
    },
    {
      source: {
        id: null,
        name: 'Canaltech.com.br',
      },
      author: 'Caio Carvalho',
      title: 'Como usar o Google Tradutor no WhatsApp - Canaltech',
      description:
        'Conheça dois métodos simples para usar o Google Tradutor no WhatsApp no Android ou iPhone (iOS). Recurso pode ser usado diretamente no aplicativo de mensagens',
      url: 'https://canaltech.com.br/apps/como-usar-o-google-tradutor-no-whatsapp/',
      urlToImage:
        'https://t.ctcdn.com.br/SyEnbSfH0ISek1tiyri7S-GPTDU=/1400x788/smart/i598180.jpeg',
      publishedAt: '2022-06-03T10:00:00Z',
      content:
        'É possível usar o Google Tradutor no WhatsApp para traduzir mensagens escritas em outros idiomas no aplicativo. Basta instalar o app e depois não precisa mais fechar o WhatsApp, já que o recurso é ac… [+3003 chars]',
    },
    {
      source: {
        id: null,
        name: 'jeuxvideo.com',
      },
      author: 'Yuriky00',
      title:
        'Enfin moins de notifications envahissantes grâce à Google Chrome - jeuxvideo.com',
      description:
        'Google Chrome s’est déjà lancé dans une lutte acharnée contre les notifications jugées indésirables par les utilisateurs. En récoltant de nombreuses données utilisateurs, le moteur de recherche veut vous simplifier la vie, du moins, la navigation, en bloquant…',
      url: 'https://www.jeuxvideo.com/news/1582273/enfin-moins-de-notifications-envahissantes-grace-a-google-chrome.htm',
      urlToImage:
        'https://image.jeuxvideo.com/medias-md/165418/1654175935-5660-card.jpg',
      publishedAt: '2022-06-03T08:40:02Z',
      content:
        'Google Chrome sest déjà lancé dans une lutte acharnée contre les notifications jugées indésirables par les utilisateurs. En récoltant de nombreuses données utilisateurs, le moteur de recherche veut v… [+2489 chars]',
    },
    {
      source: {
        id: null,
        name: 'Developpez.com',
      },
      author: null,
      title:
        "L'équipe Angular de Google annonce la version 14 d'Angular, le framework open source basé sur TypeScript, elle apporte un diagnostic étendu pour les développeurs - Developpez.com",
      description:
        "Emma Twersky Ing�nieur en relations avec les d�veloppeurs chez Google, sp�cialis� dans Angular et l'open source a annonc� la version 14 d�Angular, le framework open source bas� sur TypeScript, elle r�sout le probl�me le plus important d'Angular sur GitHub : l…",
      url: 'https://typescript.developpez.com/actu/334055/L-equipe-Angular-de-Google-annonce-la-version-14-d-Angular-le-framework-open-source-base-sur-TypeScript-elle-apporte-un-diagnostic-etendu-pour-les-developpeurs/',
      urlToImage: 'https://www.developpez.com/images/logos/angular.png',
      publishedAt: '2022-06-03T07:43:16Z',
      content:
        "Emma Twersky Ingnieur en relations avec les dveloppeurs chez Google, spcialis dans Angular et l'open source a annonc la version 14 dAngular, le framework open source bas sur TypeScript, elle rsout le… [+11282 chars]",
    },
    {
      source: {
        id: null,
        name: 'Les Numériques',
      },
      author: 'lesnums, ETX',
      title:
        'L\'intelligence artificielle "Gato" peut-elle surpasser l\'intelligence humaine ? - Les Numériques',
      description:
        'Deepmind, société de Google spécialisée dans l\'intelligence artificielle a présenté récemment son modèle "Gato". Cette IA dite généraliste serait capable de réaliser 600 tâches différentes. Et dans la plupart de ces tâches, l\'IA obtiendrait de meilleures perf…',
      url: 'https://www.lesnumeriques.com/vie-du-net/l-intelligence-artificielle-gato-peut-elle-surpasser-l-intelligence-humaine-n184451.html',
      urlToImage:
        'https://cdn.lesnumeriques.com/optim/news/18/184451/f90f2b28-l-intelligence-artificielle-gato-peut-elle-surpasser-l-intelligence-humaine__1200_630__overflow.jpeg',
      publishedAt: '2022-06-03T06:45:00Z',
      content:
        'Deepmind, société de Google spécialisée dans l\'intelligence artificielle a présenté récemment son modèle "Gato". Cette IA dite généraliste serait capable de réaliser 600 tâches différentes. Et dans l… [+4256 chars]',
    },
    {
      source: {
        id: null,
        name: 'Dotekomanie.cz',
      },
      author: 'Dotekománie.cz',
      title:
        'Google představuje 5 novinek pro Android smartphony - Dotekomanie',
      description:
        'Google poměrně pravidelně každý pár měsíců představí novinky pro zařízení s Androidem. Někdy jde o vylepšení pro smartphony Pixel, jindy jde o novinky pro',
      url: 'https://dotekomanie.cz/2022/06/google-predstavuje-5-novinek-pro-android-smartphony/',
      urlToImage:
        'https://dotekomanie.cz/wp-content/uploads/2022/03/android-12L-1980x1108x.jpg',
      publishedAt: '2022-06-03T06:00:54Z',
      content:
        'Google pomrn pravideln kadý pár msíc pedstaví novinky pro zaízení s Androidem. Nkdy jde o vylepení pro smartphony Pixel, jindy jde o novinky pro vechny. Dnes zde máme nkolik vylepení s omezením.\r\nJar… [+1041 chars]',
    },
    {
      source: {
        id: null,
        name: 'futurezone.at',
      },
      author: 'futurezone.at',
      title:
        'Android Auto für Smartphones wird endgültig abgedreht - futurezone.at',
      description:
        'Das Ende der Auto-Anwendung von Google ist da. Ersetzt wird Android Auto für Smartphones durch den Assistant Driving Mode.',
      url: 'https://futurezone.at/apps/android-auto-fuer-smartphones-ende-aus-google-maps-assistant-driving-mode-fahrmodus/402030197',
      urlToImage:
        'https://image.futurezone.at/images/facebook/6962951/isaac-mehegan-7x5v13744km-unsplash.jpeg',
      publishedAt: '2022-06-03T05:46:00Z',
      content:
        '03.06.2022\r\nDas Ende der Auto-Anwendung von Google ist da. Ersetzt wird Android Auto für Smartphones durch den Assistant Driving Mode.\r\nDieser Hinweis wird angezeigt, wenn man "Android Auto für Smart… [+27 chars]',
    },
    {
      source: {
        id: null,
        name: 'Les Numériques',
      },
      author: 'Kevin Hiot',
      title:
        "Tout savoir sur /e/OS V1, l'interface mobile de Murena (/e/ Foundation) - Les Numériques",
      description:
        "En 2018, Gaël Duval créait un système d'exploitation ne reposant pas sur les services de Google. 4 ans plus tard, l'OS sort de sa version bêta pour proposer une V1 qui met l'accent sur la vie privée et le contrôle des données personnelles.",
      url: 'https://www.lesnumeriques.com/telephone-portable/tout-savoir-sur-e-os-v1-l-interface-mobile-de-murena-e-foundation-a184011.html',
      urlToImage:
        'https://cdn.lesnumeriques.com/optim/article/18/184011/83062cb1-tout-savoir-sur-e-os-v1-l-interface-mobile-de-murena-e-foundation_png__1200_630__0-111-1599-950.jpg',
      publishedAt: '2022-06-03T05:00:00Z',
      content:
        "En 2018, Gaël Duval créait un système d'exploitation ne reposant pas sur les services de Google. 4 ans plus tard, l'OS sort de sa version bêta pour proposer une V1 qui met l'accent sur la vie privée … [+4578 chars]",
    },
    {
      source: {
        id: null,
        name: 'jeuxvideo.com',
      },
      author: 'Katshu',
      title:
        'Google Pixel 6 : grosses promotions sur le meilleur smartphone 5G pour faire de la photo - jeuxvideo.com',
      description:
        'Pour faire de la photo vous n’avez plus besoin d’investir dans de gros appareils haut de gamme, à moins d’être un professionnel. Le Pixel 6 de Google se distingue de la concurrence par l’excellente qualité de photo qu’on peut prendre avec. Et il est actuellem…',
      url: 'https://www.jeuxvideo.com/news/1582289/google-pixel-6-grosses-promotions-sur-le-meilleur-smartphone-5g-pour-faire-de-la-photo.htm',
      urlToImage:
        'https://image.jeuxvideo.com/medias-md/165418/1654178938-9127-card.png',
      publishedAt: '2022-06-03T04:50:02Z',
      content:
        'Pour faire de la photo vous navez plus besoin dinvestir dans de gros appareils haut de gamme, à moins dêtre un professionnel. Le Pixel 6 de Google se distingue de la concurrence par lexcellente quali… [+2153 chars]',
    },
    {
      source: {
        id: null,
        name: 'heise online',
      },
      author: 'Daniel AJ Sokolov',
      title:
        'Googles Messaging-Rochade: Google Meet wird zu Duo wird zu Meet - heise online',
      description:
        'Zuwachs für Googles Marken-Friedhof: Die Features aus Google Meet wandern zu Google Duo, das später in Google Meet umbenannt wird. Alle Klarheiten beseitigt?',
      url: 'https://www.heise.de/meinung/Googles-Messaging-Rochade-Google-Meet-wird-zu-Duo-wird-zu-Meet-7130857.html',
      urlToImage:
        'https://heise.cloudimg.io/bound/1200x1200/q85.png-lossy-85.webp-lossy-85.foil1/_www-heise-de_/imgs/18/3/5/5/4/5/2/7/Handy_Frau-5dfd189f6cf27313.JPG',
      publishedAt: '2022-06-03T01:05:00Z',
      content:
        'Das Chaos bei Googles Messaging-Dienst geht weiter. Die Videokonferenz-Apps Google Duo und Google Meet werden verschmolzen jetzt aber wirklich. Konkret werden die Features aus Google Meet an die Feat… [+5135 chars]',
    },
    {
      source: {
        id: null,
        name: 'Perfil.com',
      },
      author: 'Peek Peek',
      title:
        '"Diablo Immortal" ya se puede descargar en celulares - Perfil.com',
      description:
        'El candidato a juego del año de la saga Diablo ya se encuentra disponible en su versión mobile gratuita en las tiendas de App Store y Google Play. Acción, rol, loot y santuario, ahora en la palma de tu mano.',
      url: 'https://www.perfil.com/noticias/gaming/diablo-immortal-ya-se-puede-descargar-en-celulares-peek.phtml',
      urlToImage:
        'https://fotos.perfil.com/2022/06/02/trim/1140/641/diablo-immortal-ya-se-puede-descargar-en-celulares-1366247.jpg',
      publishedAt: '2022-06-02T22:18:00Z',
      content:
        'Diablo Immortal es un videojuego en desarrollo, perteneciente al género de acción de la serie de videojuegos Diablo, diseñado para el juego multijugador en línea, con dispositivos móviles. Lucha cont… [+3706 chars]',
    },
    {
      source: {
        id: null,
        name: 'CNET',
      },
      author: 'Laura Hautala',
      title:
        "Here's Why Amazon Won't Let You Buy Books on Kindle App for Android Anymore - CNET",
      description:
        "Google wants a 15% cut of digital content purchases people make in apps sold on the Play Store. Amazon has told customers they can buy e-books on the company's website instead of through the Android app.",
      url: 'https://www.cnet.com/tech/services-and-software/heres-why-amazon-wont-let-you-buy-books-on-kindle-app-for-android-anymore/',
      urlToImage:
        'https://www.cnet.com/a/img/resize/509b2f713c317dee8f913f387d0cbee033bea56b/2022/05/31/6f0a03d7-11ce-4545-ac95-0143a13716d8/gettyimages-1240921264.jpg?auto=webp&fit=crop&height=630&width=1200',
      publishedAt: '2022-06-02T22:00:00Z',
      content:
        'Amazon let customers know on Tuesday they can no longer rent or buy books or pay for Kindle Unlimited subscriptions using the Kindle app. In an email, the company explained people will have to pay fo… [+1701 chars]',
    },
  ],
};

test('renders learn react link', async () => {
  // jest.fn();
  jest.spyOn(window, 'fetch').mockImplementation(() => {
    return Promise.resolve({
      ok: true,
      status: 200,
      json: () => data,
    } as any);
  });

  render(<Search />);
  const searchElement = screen.getByText('Search');
  const inputBox = screen.getByRole('textbox');
  expect(inputBox).toBeInTheDocument();
  expect(screen.queryByText('Search xxxx')).toBeNull();
  // await screen.findByText('Search');
  expect(searchElement).toBeInTheDocument();

  expect(screen.getByText('Searches for ...')).toBeInTheDocument();
  userEvent.type(inputBox, 'google');
  expect(screen.getByText('Searches for google')).toBeInTheDocument();

  fireEvent.change(inputBox, { target: { value: 'apple' } });
  expect(screen.getByText('Searches for apple')).toBeInTheDocument();

  fireEvent.change(screen.getByTestId('select'), {
    target: { value: 'technology' },
  });

  const submitButton = screen.getByTestId('submit-button');
  act(() => {
    submitButton.click();
  });
  const loadingText = await screen.findByText('Loading...');
  expect(loadingText).toBeInTheDocument();
  await waitForElementToBeRemoved(() => screen.queryByText('Loading...'));
  expect(screen.getByText('anónimo')).toBeInTheDocument();
  expect(await screen.findByTestId('news-heading')).toBeInTheDocument();
});
