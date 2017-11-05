import { Injectable } from '@angular/core';
import { UserProfiles } from './data.model';

@Injectable()
export class AuthService {
    userProfiles: UserProfiles = new UserProfiles();

    login(user: string, password: string): boolean {
        user = user.toUpperCase(); //optimization, so not calling toUpperCase for every profile
        var isValid: boolean;
        this.userProfiles.userProfiles.forEach(profile=> {
            //this assumes that usernames are unique and so if a user doesn't
            //enter the correct password for an username, it should stop immediately
            //rather than contining through other usernames
            if (user === profile["username"].toUpperCase()){
                if (password === profile["pwd"]){
                    localStorage.setItem('username', user);
                    localStorage.setItem('fname', profile["fname"]);
                    localStorage.setItem('lname', profile["lname"]);
                    isValid = true;
                    return isValid;
                }
                isValid = false;
                return isValid;
            }
        });
        return isValid;
    }

    logout(): any {
        localStorage.removeItem('username');
        localStorage.removeItem('fname');
        localStorage.removeItem('lname');
    }

    getUser(): any {
        return { username: localStorage.getItem('username'), 
                 fname: localStorage.getItem('fname'), 
                 lname: localStorage.getItem('lname')
                };
    }

    isLoggedIn(): boolean {
        return this.getUser() !== null;
    }
}

export const AUTH_PROVIDERS: Array<any> = [
  { provide: AuthService, useClass: AuthService }
];
