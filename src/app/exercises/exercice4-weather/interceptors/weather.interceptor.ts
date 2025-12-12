import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const weatherInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('🌐 HTTP Request:', req.url);
  
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'Une erreur est survenue';
      
      if (error.status === 404) {
        errorMessage = 'Ville non trouvée';
      } else if (error.status === 401) {
        errorMessage = 'Clé API invalide';
      } else if (error.status === 429) {
        errorMessage = 'Trop de requêtes. Veuillez réessayer plus tard.';
      } else if (error.status === 0) {
        errorMessage = 'Erreur de connexion. Vérifiez votre connexion internet.';
      }
      
      console.error('❌ HTTP Error:', errorMessage, error);
      
      return throwError(() => new Error(errorMessage));
    })
  );
};
