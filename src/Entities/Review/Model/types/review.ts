// proection on DB
export type Review = {
   
        id?: string,
        patientId?: string,
        description?: string,
        firstName?:string,
        lastName?:string,
        patronymic?:string,
        
        createdDate?: Date,
    
};
export type ReviewSchema = {
          
        description?: string,
          
};
