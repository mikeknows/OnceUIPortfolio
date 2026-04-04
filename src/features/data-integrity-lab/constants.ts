import { RawRecord } from "./types";

export const REQUIRED_FIELDS: Array<keyof RawRecord> = [
  "firstName",
  "lastName",
  "dateOfBirth",
  "sourceSystemId",
  "externalClientId",
];

export const US_STATE_CODES = new Set([
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY",
]);

export const STREET_MAP: Record<string, string> = {
  street: "St",
  avenue: "Ave",
  road: "Rd",
  boulevard: "Blvd",
  lane: "Ln",
  drive: "Dr",
  court: "Ct",
};

export const DEMO_DATASET: RawRecord[] = [
  { firstName: " Alice ", lastName: "Nguyen", dateOfBirth: "1989-03-14", ssnLast4: "1122", email: "ALICE.NGUYEN@EXAMPLE.COM", phone: "(555) 111-2222", street: "123 Maple Street", city: "Denver", state: "co", zip: "80203", sourceSystemId: "CRM_A", externalClientId: "A-1001" },
  { firstName: "Alice", lastName: "Nguyen", dateOfBirth: "1989-03-14", ssnLast4: "1122", email: "alice.nguyen@example.com", phone: "5551112222", street: "123 Maple St.", city: "Denver", state: "CO", zip: "80203", sourceSystemId: "CRM_A", externalClientId: "A-1001" },
  { firstName: "Alicia", lastName: "Nguyen", dateOfBirth: "1989-03-14", ssnLast4: "1122", email: "ali.nguyen+test@example.com", phone: "555-111-2222", street: "999 Elm Road", city: "Aurora", state: "CO", zip: "80012", sourceSystemId: "CRM_A", externalClientId: "A-1001" },
  { firstName: "Robert", lastName: "Diaz", dateOfBirth: "1978-07-22", ssnLast4: "7711", email: "robert.diaz@example.com", phone: "5552221010", street: "41 Cedar Avenue", city: "Phoenix", state: "AZ", zip: "85001", sourceSystemId: "BILLING", externalClientId: "B-9120" },
  { firstName: "ROBERT", lastName: "DIAZ", dateOfBirth: "1978-07-22", ssnLast4: "7711", email: "rdiaz@example.com", phone: "5552221010", street: "41 Cedar Ave", city: "Phoenix", state: "AZ", zip: "85001", sourceSystemId: "INTAKE", externalClientId: "IN-440" },
  { firstName: "Mia", lastName: "Patel", dateOfBirth: "1992-11-05", ssnLast4: "9988", email: "mia.patel@example.com", phone: "5553339898", street: "8 Oak Avenue", city: "Austin", state: "TX", zip: "73301", sourceSystemId: "CRM_A", externalClientId: "A-1002" },
  { firstName: "Mia", lastName: "Patel", dateOfBirth: "1992-11-05", ssnLast4: "", email: "mia.patel+old@example.com", phone: "5553339898", street: "8 Oak Avenue", city: "Austin", state: "TX", zip: "73302", sourceSystemId: "CRM_B", externalClientId: "A-1002" },
  { firstName: "Liam", lastName: "Johnson", dateOfBirth: "1984-02-30", ssnLast4: "2233", email: "liam.johnson@example.com", phone: "5554441000", street: "77 Birch Street", city: "Miami", state: "FL", zip: "33101", sourceSystemId: "CRM_A", externalClientId: "A-1003" },
  { firstName: "Noah", lastName: "", dateOfBirth: "1999-09-09", ssnLast4: "5544", email: "noah.mail.com", phone: "5558881234", street: "10 Lake Road", city: "Tampa", state: "FL", zip: "3360", sourceSystemId: "CRM_A", externalClientId: "A-1004" },
  { firstName: "Emma", lastName: "Stone", dateOfBirth: "1996-06-18", ssnLast4: "777", email: "emma.stone@example.com", phone: "555-444-7777 ext 9", street: "52 Hill Street", city: "Seattle", state: "WA", zip: "98101", sourceSystemId: "CRM_A", externalClientId: "A-1005" },
  { firstName: "Olivia", lastName: "Baker", dateOfBirth: "1990-01-12", ssnLast4: "6699", email: "olivia.baker@example.com", phone: "5551213434", street: "911 Pine Street", city: "Portland", state: "OR", zip: "97201", sourceSystemId: "CRM_A", externalClientId: "A-1006" },
  { firstName: "Olivia", lastName: "Baker", dateOfBirth: "1990-01-12", ssnLast4: "6699", email: "obaker@example.com", phone: "5551213435", street: "911 Pine Street", city: "Portland", state: "OR", zip: "97201", sourceSystemId: "CRM_C", externalClientId: "X-111" },
  { firstName: "Ethan", lastName: "Wright", dateOfBirth: "1988-12-02", ssnLast4: "1200", email: "ethan.wright@example.com", phone: "5554561000", street: " 18   River   Road ", city: "Boise", state: "id", zip: "83702", sourceSystemId: "CRM_B", externalClientId: "B-1001" },
  { firstName: "Sophia", lastName: "Reed", dateOfBirth: "1975-04-17", ssnLast4: "3300", email: "", phone: "", street: "600 Summit Avenue", city: "Madison", state: "WI", zip: "53703", sourceSystemId: "LEGACY", externalClientId: "L-210" },
  { firstName: "Mason", lastName: "King", dateOfBirth: "1981-08-21", ssnLast4: "4499", email: "mason.king@example.com", phone: "5557771001", street: "14 Harbor Boulevard", city: "San Diego", state: "CA", zip: "92101", sourceSystemId: "CRM_A", externalClientId: "A-1007" },
  { firstName: "Mason", lastName: "King", dateOfBirth: "1981-08-21", ssnLast4: "4499", email: "mason.king@example.com", phone: "5557771001", street: "14 Harbor Blvd", city: "San Diego", state: "CA", zip: "92101", sourceSystemId: "CRM_A", externalClientId: "A-1007" },
  { firstName: "Isabella", lastName: "Cruz", dateOfBirth: "2000-10-30", ssnLast4: "5432", email: "isabella.cruz@example.com", phone: "5552304400", street: "4 Cherry Street", city: "Boston", state: "MA", zip: "02108", sourceSystemId: "WEB", externalClientId: "W-190" },
  { firstName: "Isabela", lastName: "Cruz", dateOfBirth: "2000-10-30", ssnLast4: "", email: "isabella.cruz@example.net", phone: "5552304409", street: "4 Cherry Street", city: "Boston", state: "MA", zip: "02108", sourceSystemId: "CALL_CENTER", externalClientId: "CC-190" },
  { firstName: "James", lastName: "Miller", dateOfBirth: "1970-05-11", ssnLast4: "1234", email: "james.miller@example.com", phone: "5558802200", street: "88 Market Street", city: "Newark", state: "NJ", zip: "07102", sourceSystemId: "CRM_A", externalClientId: "A-1008" },
  { firstName: "James", lastName: "Muller", dateOfBirth: "1970-05-11", ssnLast4: "1234", email: "james.miller@example.com", phone: "5558802200", street: "88 Market Street", city: "Newark", state: "NJ", zip: "07102", sourceSystemId: "PARTNER", externalClientId: "P-508" },
  { firstName: "Ava", lastName: "Brooks", dateOfBirth: "1995-03-09", ssnLast4: "8899", email: "ava.brooks@example.com", phone: "5551234567", street: "17 North Avenue", city: "Columbus", state: "OH", zip: "43215", sourceSystemId: "CRM_A", externalClientId: "A-1009" },
  { firstName: "Ava", lastName: "Brooks", dateOfBirth: "", ssnLast4: "8899", email: "ava.brooks@example.com", phone: "5551234567", street: "17 North Avenue", city: "Columbus", state: "OH", zip: "43215", sourceSystemId: "CRM_A", externalClientId: "A-1010" }
];
