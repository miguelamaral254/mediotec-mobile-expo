export interface CreateGradeInterface{
    studentCpf: string;            
    disciplineId: number | undefined;          
    evaluation: number;            
    evaluationType: string;        
    evaluationDate: string;       
}