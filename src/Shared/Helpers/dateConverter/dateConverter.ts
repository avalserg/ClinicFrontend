import { DateTime } from "luxon";

export const dateConverter = (dateBirthday:string|undefined):string=> {
    try {
     const value =  DateTime.fromJSDate(
          new Date(dateBirthday!),
        ).toFormat('yyyy-MM-dd');
        return value;
    } catch (error) {
        console.error('Data invalid');
        return "";
  }
}