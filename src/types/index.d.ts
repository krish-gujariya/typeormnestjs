import { Express, Request } from 'express';

declare global{
    namespace Express{
         interface Request{
            customFileError:number;
            
        }
        interface User{
            id:number;
            role_id:number;
        }
        

    }
}
