import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, mergeMap } from 'rxjs/operators';
import { Project, Program, User } from '../interfaces/api.interfaces';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { Observable } from 'rxjs/Observable';
import { APIService } from '../services/api.service';


@Injectable()
export class TeamMemberGuard implements CanActivate {
    constructor(private authService: AuthService, private apiService: APIService) {
    }

    canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
        const projId = +route.params['projId'];

        const projectProgramObservable: Observable<[Project, Program]> = this.apiService.getProjectById(projId).pipe(
            mergeMap((project: Project) => this.apiService.getProgramById(project.program),
                (project: Project, program: Program) => [project, program] as [Project, Program])
        );

        return forkJoin(projectProgramObservable, this.authService.getCurrentUser()).pipe(
            map((result: [[Project, Program], User]) => {
                const project: Project = result[0][0];
                const program: Program = result[0][1];
                const user: User = result[1];

                if (user.is_admin) {
                    return true;
                } else if (user.is_data_engineer && program.data_engineers.indexOf(user.id) > -1) {
                    return true;
                } else {
                    return project.custodians.indexOf(user.id) > -1;
                }
            })
        );
    }
}
