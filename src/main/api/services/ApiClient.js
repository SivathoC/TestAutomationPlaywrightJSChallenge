export class ApiClient {
  constructor(request) {
    this.request = request;
    this.baseUrl = 'https://restful-booker.herokuapp.com';
  }

  // Auth
  async authenticate(username, password) {
    const response = await this.request.post(`${this.baseUrl}/auth`, {
      data: { username, password }
    });
    return response; // Return the full response object
  }
  async getAuthToken(username, password) {
    const response = await this.authenticate(username, password);
    const { token } = await response.json();
    return token;
  }
  // Get Booking optional Parameters
  async getAllBooking(){
    return this.request.get(`${this.baseUrl}/booking`);
  }
  async getBookingByFirtname(firstname){
    return this.request.get(`${this.baseUrl}/booking`, {
      firstname
    });
  }
  async getBookingByLastname(lastname){
    return this.request.get(`${this.baseUrl}/booking`, { 
      lastname
    });
  }
    async getBookingByFirstnameAndLastname(firstname, lastname){
    return this.request.get(`${this.baseUrl}/booking`, {
      firstname, 
      lastname
    });
  }
  async getBookingByCheckin(checkin){
    return this.request.get(`${this.baseUrl}/booking`, {
      checkin
    });
  }
    async getBookingByCheckout(checkout){
    return this.request.get(`${this.baseUrl}/booking`, {
      checkout
    });
  }
  async getBookingByCheckinAndCheckout(checkin, checkout){
    return this.request.get(`${this.baseUrl}/booking`, {
      checkin, 
      checkout
    });
  }
  // Get Booking details by ID
  async getBooking(id) {
    return this.request.get(`${this.baseUrl}/booking/${id}`);
  }
  // Create Booking
  async createBooking(data) {
    return this.request.post(`${this.baseUrl}/booking`, {
      headers: this.getCreateHeaders(),
      data
    });
  }
  // Update Booking 
  async updateBooking(bookingid, token, data) {
    return this.request.put(`${this.baseUrl}/booking/${bookingid}`, {
      headers: this.getAuthHeaders(token),
      data
    });
  }
  async partialUpdateBooking(bookingid, token, data) {
    return this.request.patch(`${this.baseUrl}/booking/${bookingid}`, {
      headers: this.getAuthHeaders(token),
      data
    });
  }
  // Delete Booking
  async deleteBooking(bookingid, token) {
    return this.request.delete(`${this.baseUrl}/booking/${bookingid}`, {
      headers: this.getDeleteHeaders(token)
    })
  }
  // Headers
  getAuthHeaders(token) {
    return {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Cookie': `token=${token}`
    };
  }
  getCreateHeaders(){
    return {
      'Content-Type': 'application/json'
    };
  }
  getDeleteHeaders(token) {
    return {
      'Content-Type': 'application/json',
      'Cookie': `token=${token}`
    };
  }
}