import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';

export const MAIN_LOADER = 'main';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  private _loadings = new Map<string, BehaviorSubject<number>>;

  public isLoading(name: string): Observable<boolean> {
    return this.getSubject(name).pipe(map(v => v > 0));
  }

  // Count all loading processes and turn off the spinner after the last process finished
  public setLoading(loading: boolean, componentName: string | null = MAIN_LOADER): void {
    const subject = this.getSubject(componentName || MAIN_LOADER);
    subject.next(
      Math.max(subject.value + (loading ? +1 : -1), 0)
    );
  }

  // Returns subject with a number as the current count of loading precesses
  private getSubject(name: string): BehaviorSubject<number> {
    let subject = this._loadings.get(name);
    if (!subject) {
      subject = new BehaviorSubject<number>(0);
      this._loadings.set(name, subject);
    }
    return subject;
  }

}
