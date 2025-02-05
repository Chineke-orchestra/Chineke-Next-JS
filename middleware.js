import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  const redirectionMap = {
    '/become-a-friend': '/donate',
    '/chineke-junior-auditions': '/',
    '/chineke-junior-orchestra-the-reunion-concert': '/',
    '/dvorak-symphony-no9-from-the-new-world-sibelius-finlandia': '/',
    '/education-work': '/',
    '/frank-douglas': '/dr-frank-douglas',
    '/gallery': '/',
    '/home-1': '/',
    '/kenneth-tharp': '/kenneth-olumuyiwa-tharp',
    '/listen': '/listen',
    '/lockdown-learning-library': '/',
    '/new-index': '/',
    '/new-page': '/',
    '/our-board': '/',
    '/our-founder': '/',
    '/our-staff': '/',
    '/players': '/',
    '/promotionaldeck': '/',
    '/rachmaninov-piano-concerto-no3-sibelius-no2': '/',
    '/research': '/',
    '/reviews-old': '/',
    '/reviews': '/',
    '/stephen-carpenter': '/',
    '/supporters': '/donate',
    '/upcoming-concerts': '/',
    '/vacancies': '/',
    '/watch': '/',
    '/work-in-schools-and-the-community': '/',
  };


  if (pathname in redirectionMap) {
    const destinationPath = redirectionMap[pathname];

    if (destinationPath) {
      return NextResponse.redirect(new URL(destinationPath, request.url));
    }
    return NextResponse.next();
  }

  const regexPatterns = [
    /^\/events\/(.+)/, 
    /^\/news\/(.+)/,  
  ];

  for (const regex of regexPatterns) {
    if (regex.test(pathname)) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}
