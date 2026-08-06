//IMPORTA O TIPO APPLICATIONCONFIG, USADO PARA CONFIGURAR A APLICAÇÃO ANGULAR
import { ApplicationConfig } from '@angular/core';

//IMPORTA A FUNÇÃO QUE REGISTRA AS ROTAS DA APLICAÇÃO
import { provideRouter } from '@angular/router';

//IMPORTA A FUNÇÃO QUE HABILITA O HTTPCLIENT PARA FAZER REQUISIÇÕES HTTP
import { provideHttpClient } from '@angular/common/http';

//IMPORTA O ARQUIVO ONDE ESTÃO DEFINIDAS AS ROTAS DA APLICAÇÃO
import { routes } from './app.routes';

//CONFIGURAÇÃO PRINCIPAL DA APLICAÇÃO
export const appConfig: ApplicationConfig = {

  //LISTA DE SERVIÇOS (PROVIDERS) DISPONÍVEIS PARA TODA A APLICAÇÃO
  providers: [

    // REGISTRA AS ROTAS DEFINIDAS EM APP.ROUTES.TS
    provideRouter(routes),

    // HABILITA O HTTPCLIENT PARA REALIZAR REQUISIÇÕES HTTP
    // (GET, POST, PUT, DELETE E ETC)
    provideHttpClient()

  ]
};