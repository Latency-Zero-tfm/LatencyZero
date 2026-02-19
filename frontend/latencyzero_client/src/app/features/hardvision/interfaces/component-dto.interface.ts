
export interface ComponentDTO {
  predicted_label?: string;
  predicted_label_es?: string;
  predicted_index?: number;
  confidences?: { [key: string]: number };
  ocr?: string[];
  brand?: string;
  error?: string;
  message?: string;
}
