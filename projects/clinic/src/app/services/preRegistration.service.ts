import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BaseService } from 'projects/patient/src/app/services/base.service'

@Injectable({
  providedIn: 'root'
})
export class PreRegistrationService extends BaseService {
  constructor (private readonly http: HttpClient) {
    super()
  }

  patientPreRegistration (patientName: string, patientEmail: string) {
    const formData = new FormData()
    const body = { patientName, patientEmail }
    return this.http.post<any>(`${this.getBaseUrl()}/api/clinic/preregisterpatient`, body)
  }

  professionalPreRegistration (professionalName: string, professionalEmail: string) {
    const formData = new FormData()
    const body = { professionalName, professionalEmail }
    return this.http.post<any>(`${this.getBaseUrl()}​/api/clinic/preregisterprofessional`, body)
  }
}
