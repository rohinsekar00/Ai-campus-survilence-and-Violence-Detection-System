ABSTRACT 
This project proposes a real-time, AI-powered surveillance system for campus safety and 
behavior monitoring. It integrates multimodal AI to detect violence, verbal abuse, loitering, 
trespassing, falls, and restricted-area violations. Video analysis uses YOLO object detection, 
action recognition, and pose estimation, while audio analysis applies MFCC and RNNs to 
detect shouting, distress cries, abusive language, and glass-breaking. Fusing audio-visual data 
improves detection accuracy, and potential threats trigger instant alerts via 
Email/Telegram/WhatsApp, along with 10–30 second evidence clips tagged with time, 
location, and module. The system supports offline testing with recorded inputs and live 
CCTV/microphone feeds, all visualized in a zone-based dashboard showing alerts, heatmaps, 
and safety trends. A multi-role access model ensures role-based visibility for admins, security 
staff, and auditors. Designed as lightweight, modular, and privacy-aware, the solution reduces 
manual monitoring, minimizes oversight errors, and enables faster responses, providing a 
scalable intelligent platform for campus surveillance and safety. 
v 
 
 
 
 
TABLE OF CONTENTS 
 
 
 
Chapter 
No 
Title Page No. 
 ABSTRACT v 
 LIST OF FIGURES vii 
1 INTRODUCTION 1 
2 LITERATURE SURVEY 2 
 2.1 Inferences from Literature Survey 7 
 2.2 Open problems in Existing System 8 
3 REQUIREMENTS ANALYSIS 10 
 3.1 Feasibility Studies/Risk Analysis of the Project 10 
 3.2 Software Requirements Specification  11 
4 DESCRIPTION OF PROPOSED SYSTEM 13 
 4.1 Selected Methodologies  13 
 4.2 Architecture Diagram 14 
 4.3 Detailed Description of Modules and Workflow                    15 
    
 REFERENCES 16 
 
 
 
 
 
 
 
  
 
 
 
 
 
vi 
 
 
 
LIST OF FIGURES 
 
 
 
FIGURE 
NO. 
FIGURE NAME PAGE 
NO. 
4.1                    Smart Surveillance System Architecture 14 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
vii
 
 
 
CHAPTER 1 
INTRODUCTION 
Campus safety has become a major concern due to incidents of violence, ragging, 
harassment, and accidents. Traditional CCTV-based surveillance systems depend 
heavily on human operators, which often leads to missed events because of fatigue, 
delayed response, or limited coverage. This highlights the need for an intelligent 
surveillance solution that can automatically detect and respond to abnormal activities 
in real time. 
With advancements in Artificial Intelligence, Computer Vision, and Audio Analysis, 
automated systems are now capable of detecting unusual behaviour more accurately. 
Multimodal approaches, which combine video and audio inputs, provide stronger 
reliability compared to single-source monitoring. For example, detecting both 
aggressive actions in video and distress sounds in audio gives higher confidence in 
identifying a violent incident. 
The proposed project, AI-Powered Multimodal Safety & Behaviour Monitoring 
System, focuses on integrating video and audio analysis to enhance campus 
surveillance. Video modules using YOLO and action recognition detect violence, 
loitering, and suspicious gatherings. Pose estimation identifies accidental falls, while 
geofencing alerts for trespassing. Audio modules using MFCC and RNN models 
recognize shouting, screaming, and glass breaking. 
Whenever an incident is detected, the system generates instant alerts through Email, 
WhatsApp, or Telegram, while also saving short evidence clips with timestamps and 
location tags. It supports both offline testing using pre-recorded files and real-time 
integration with CCTV and microphones. 
A centralized dashboard visualizes incidents on a zone map, shows heatmaps of 
activity, and provides weekly or monthly behaviour reports. Role-based access 
ensures that administrators, security staff, and auditors get information as per their 
needs. 
In summary, this project provides a modular, scalable, and privacy-aware platform 
that reduces reliance on manual monitoring, speeds up response time, and improves 
overall campus safety. 
1 
CHAPTER 2 
LITERATURE SURVEY 
Title: AiWatch: A Distributed Video Surveillance System Using Artificial Intelligence 
Author: S. Nouri, H. K. Nguyen, Y. K. Mehmood 
Year: 2024 
As the scale and complexity of public surveillance grow, ensuring both real-time 
event detection and scalable system management becomes essential. This paper 
introduces AiWatch, a distributed AI-driven surveillance platform that utilizes 
advanced deep learning models for automatic detection of suspicious behavior, 
violence, and unauthorized access in video feeds. Employing convolutional and 
recurrent neural networks, AiWatch processes real-time and stored streams from 
multiple cameras, delivering event-based alerts to administrators. Comprehensive 
experiments demonstrate high accuracy and timely alerting, establishing AiWatch as 
a robust, upgradeable solution for modern surveillance infrastructure. 
Title: Human Scream Detection and Analysis for Controlling Crime Rate Using 
Machine Learning and Deep Learning 
Author: D. B. Suryawanshi, S. S. Dubey 
Year: 2024 
Audio-based incidents such as screams and distress calls are vital for early detection 
and response in public safety systems, especially where video-based cues are 
insufficient. This study presents a system employing both traditional machine learning 
(SVM, Random Forest) and deep learning (CNN, LSTM) models to detect and 
classify human screams within noisy urban soundscapes. By leveraging MFCC and 
spectrogram features from recorded and real-time audio, the system achieves high 
precision and recall, even with overlapping sound events. Detailed analysis shows 
that deep neural models significantly outperform classical approaches in complex 
environments, supporting proactive measures by law enforcement and immediate 
alerting in crime-prone areas. The solution's effectiveness highlights its importance 
as a complementary module within larger multimodal safety platforms. 
2 
Title: Application of Temporal Action Detection Technology in Abnormal Event 
Detection of Surveillance Video 
Author: Chenxiang Lin, Teng Ma, Fei Wu, Jian Qian, Feilong Liao, Jinaye Huang 
Year: 2024 
With the rapid expansion of automation in high-risk environments, intelligent 
surveillance has become critical for ensuring operational safety. This paper proposes 
an enhanced abnormal event detection framework that combines a parameter- 
optimized three-dimensional (3D) convolutional neural network with temporal action 
detection and frame interpolation. The model demonstrates high precision in 
identifying complex, real-world abnormal activities such as throwing objects, 
trespassing, and unsafe work practices (e.g., working without gloves) in surveillance 
videos. Experimental results show a remarkable 99.15% accuracy and strong recall, 
proving the approach is robust under massive, complex video data. The system’s 
adaptability to diverse scenarios and its proven superiority over traditional models 
underscore its value for scalable, real-time safety management platforms in the 
power industry and similar sectors. 
Title: Real-Time Violence Detection and Intelligent Alarm Systems 
Author: S. Shinde, M. Mulla, M. Tawade 
Year: 2024 
Contemporary security frameworks demand proactive incident response capabilities. 
In this work, the authors designed a real-time violence detection system leveraging 
advanced deep learning models: YOLOv5 for object detection, MobileNet and 3D 
CNN for video analysis, and LSTM for temporal event recognition. Their integrated 
solution processes live video feeds, identifies violence with over 92% accuracy, and 
autonomously dispatches real-time alerts through channels like Telegram. The 
system is optimized for rapid response and low-latency detection, making it suitable 
for both public and institutional surveillance networks. Its modular architecture and 
automation of alarm workflows significantly reduce manual monitoring, positioning it 
as a robust solution for next-generation security and public safety infrastructure. 
3 
Title: Multilingual and Multimodal Abuse Detection 
Author: Rini Sharon, Rakesh R, Prabhakar T 
Year: 2024 
Abuse detection within diverse linguistic environments presents unique challenges for 
conventional surveillance approaches. This research introduces a multimodal 
detection methodology combining Mel-frequency cepstral coefficients (MFCC) for 
audio feature extraction, emotion embeddings, and automated speech recognition. 
By implementing neural network-based fusion of text, audio, and emotional 
indicators, the system adeptly detects screaming, abuse, and distress even in noisy 
and multi-language environments. Comparative studies show this approach 
substantially outperforms models reliant on single modalities. The resulting platform 
reliably recognizes subtle and complex auditory threats, making it highly applicable 
for deployment in culturally and linguistically diverse settings. 
Title: A Machine Learning Based System for Fall Detection and Elderly Care 
Author: R. Gayathri, S. Sumathi 
Year: 2024 
Timely fall detection remains a pivotal issue in elderly care and monitoring. This study 
evaluates vision-based (using Histograms of Oriented Gradients and Random Forest 
classifiers) and wearable sensor-based (utilizing Inertial Measurement Units and 
ensemble machine learning) fall detection approaches. The combined ensemble 
method achieves a maximum accuracy of 97%, substantially reducing false positives 
that typically hinder real-world adoption. This work provides a comprehensive 
comparison and integration strategy, supporting the deployment of reliable fall 
detection within broader AI safety and surveillance frameworks in residential care, 
hospitals, and assisted living.  
4 
Title: Revolutionizing Video Surveillance: AI-Powered Anomaly Detection 
Author: Nishant Deheriya, Devendra Kumar Bajpai, P.K. Sharma 
Year: 2025 
The authors present an advanced deep learning approach integrating Inflated 3D 
Convolution Network (I3D-ResNet50) with Multiple Instance Learning for video 
anomaly detection. Their model treats video streams as sequences of instances and 
assesses abnormality in each snippet using a neural network, achieving an AUC of 
83.85% on the UCF-101 dataset, which includes events like fighting, theft, and abuse. 
The system excels at detecting subtle and complex anomalies in large-scale, 
dynamic environments, vastly improving real-time surveillance accuracy and 
minimizing human monitoring requirements. This framework has strong potential for 
public safety in areas such as transportation, finance, and smart cities. 
Title: Anomaly Detection in Surveillance Videos 
Author: H. P., C. A. A., Rao, P. S., Modi, U., Naik, C. 
Year: 2025 
This paper introduces a novel real-time anomaly detection system using CNNs with 
LSTM, trained on the UCF-Crime dataset for tasks such as explosion, fighting, and 
accident detection. The combination of spatial (CNN) and temporal (LSTM) modeling 
yields classification accuracy of 85% for abnormal event detection. The system offers 
automated alerts and robust performance in complex scenarios, reducing the risks of 
missed incidents due to human fatigue and demanding environments. Such 
automated detection is vital for enhancing public and private sector security with 
minimal false alarms. The system’s adaptability to diverse scenarios and its proven 
superiority over traditional models underscore its value for scalable, real-time safety 
management platforms in the power industry and similar sectors. 
5 
Title: Real-Time Violence Detection in Surveillance Streams 
Author: Mukesh Kumar, Rohith Sharma 
Year: 2025 
This study proposes a scalable, real-time violence detection platform utilizing a fine
tuned DenseNet121 CNN, optimized for processing live RTSP video streams from 
surveillance cameras. With techniques like data augmentation and class balancing, 
the model attains 92% accuracy and a 0.91 weighted F1-score on the UCF-Crime 
dataset. The end-to-end system utilizes OpenCV for capture, Flask for dashboards, 
and integrates with MongoDB and Dropbox for cloud metadata and storage, ensuring 
robustness and easy deployment. Its multithreaded architecture supports real-time 
monitoring in smart cities and institutional settings, providing rapid, automated 
incident response. 
Title: Real-time Fall Detection and Reporting System Using the AlphaPose Model 
Author: Sekar, Rahul Balaji 
Year: 2025 
This research introduces a real-time fall detection and alert system adopting 
AlphaPose for precise skeleton posture recognition and ST-GCN for dynamic action 
identification. The system processes web camera data and uses machine learning to 
instantly detect falls, notifying caregivers or medical staff in under 0.5 seconds. 
Designed for real-world adaptability and robust performance across varied scenes, it 
leverages lightweight AI models for accurate, low-latency reporting—critical for 
minimizing harm due to unattended falls in elderly care or institutional environments. 
This work provides a comprehensive comparison and integration strategy, supporting 
the deployment of reliable fall detection within broader AI safety and surveillance 
frameworks in residential care, hospitals, and assisted living.  
6 
2.1 Inferences from Literature Survey 
2.1.1 Importance of Multimodal Approaches 
Recent works emphasize that combining video and audio streams significantly 
improves anomaly detection accuracy. Systems such as AiWatch (2024) demonstrate 
that visual violence cues paired with audio screams or shouting reduce false positives 
and ensure stronger validation. 
2.1.2 Advances in Video-Based Anomaly Detection 
Modern models like YOLOv5, MobileNet, and LSTMs have shown real-time violence 
detection with accuracy above 92%. Temporal action detection using 3D CNNs 
achieves >99% accuracy for trespassing, unsafe actions, or object throwing. 
2.1.3 Effectiveness of Audio-Based Analysis 
Studies highlight that MFCCs combined with CNN/RNNs can detect screams, 
distress cries, and glass breaking even in noisy environments. Audio analysis thus 
acts as an early-warning layer before violence escalates. 
2.1.4 Role of Fall Detection in Safety 
Pose-estimation and sensor-based fall detection systems report ~97% accuracy. 
Literature confirms their importance for medical emergencies and accidental injuries, 
which are common in campus or elderly care contexts. 
2.1.5 Common System Design Patterns 
Most successful systems emphasize real-time alerts, incident logging, modular 
architecture, and cloud-based evidence storage. These features ensure scalability, 
usability, and faster response in campus safety systems. 
7 
2.2 Open Problems in Existing System 
2.2.1 High False Positives 
Most existing surveillance systems still struggle with reliability. Actions such as sports 
activities, friendly handshakes, or group discussions are sometimes misclassified as 
violent or suspicious behaviour. These frequent false alarms reduce trust in the 
system and may cause security staff to ignore or overlook real threats. 
2.2.2 Privacy Concerns 
Since these systems continuously record and analyse video and audio, there are 
serious concerns regarding data privacy and ethical use. Many existing solutions do 
not include mechanisms for data anonymization, secure storage, or role-based 
access, which raises compliance issues when used in educational institutions or 
workplaces. 
2.2.3 Scalability Issues 
Research prototypes often work well in controlled test cases but fail to handle large
scale deployments with multiple zones and camera feeds. Real-time monitoring 
across an entire campus requires significant resources, and current systems are not 
optimized for such scalability. 
2.2.4 Latency in Detection 
Although termed real-time, most AI-based systems introduce processing delays of a 
few seconds due to heavy computation. In cases of violent fights or accidents, even a 
2–5 second delay in alert generation can reduce the chances of timely intervention, 
making latency a critical problem. 
8 
2.2.5 Lack of Unified Multimodal Solutions 
The majority of existing approaches are designed for either video or audio analysis, 
not both. Very few systems provide a fully integrated platform that combines video, 
audio, incident logging, real-time notifications, and analytics dashboards. This lack of 
integration limits their practical use in real-world campus surveillance. 
9 
CHAPTER 3 
REQUIREMENTS ANALYSIS 
Requirement analysis is the process of understanding and documenting what a 
system must achieve to meet the intended objectives. For this project, the analysis 
involves identifying the functional and non-functional requirements, along with 
studying the feasibility and risks involved in implementation. The goal is to ensure that 
the proposed AI-Powered Multimodal Safety & Behaviour Monitoring System is 
practical, reliable, and capable of addressing real-world campus safety challenges. 
This phase defines the expected inputs, processing, and outputs of the system while 
considering constraints such as cost, privacy, and deployment environment. The 
requirement analysis not only validates that the project is technically achievable but 
also ensures that the solution will be scalable, user-friendly, and aligned with 
institutional safety needs. 
3.1 Feasibility Studies / Risk Analysis 
The proposed AI-Powered Multimodal Safety & Behavior Monitoring System was 
analyzed for feasibility across different dimensions: 
3.1.1 Technical Feasibility: 
The system can be implemented using existing deep learning frameworks and 
readily available models such as YOLO for vision tasks and RNN for audio analysis. 
No specialized hardware is mandatory; the solution works with pre-recorded files 
and can integrate with CCTV/microphones when available. 
3.1.2 Operational Feasibility: 
Security staff and administrators can easily use the system through an intuitive 
dashboard. Instant alerts reduce dependency on continuous manual monitoring. 
Role-based access ensures smooth operation and adoption within campus security 
protocols. 
10 
3.1.3 Economic Feasibility: 
Since the system primarily requires software development and can be deployed on 
existing infrastructure (CCTV, microphones, servers), the cost is minimal compared 
to installing new proprietary surveillance systems. 
3.1.4 Risk Analysis: 
• False Positives: The system may occasionally trigger alerts for non-violent 
actions. 
• Privacy Concerns: Audio and video data handling must comply with 
institutional policies. 
• Integration Risks: Live CCTV/mic integration may face compatibility 
challenges. 
• Model Limitations: Accuracy depends on the dataset quality used for 
training. 
3.2 Software Requirements Specification (SRS) 
3.2.1 Functional Requirements: 
• Detect physical violence and aggressive actions from video. 
• Identify screaming, verbal abuse, and glass breaking from audio. 
• Recognize loitering, suspicious gatherings, and unauthorized entry. 
• Detect accidental falls using pose estimation. 
• Trigger real-time alerts via Email/WhatsApp/Telegram. 
• Store short evidence clips with timestamp, type, and location. 
• Support both pre-recorded file input and live CCTV/mic input. 
• Provide dashboard with zone mapping, incident logs, heatmaps, and analytics. 
• Enable role-based access for Admin, Security, and Auditor. 
11 
3.2.2 Non-Functional Requirements 
• Performance: Real-time processing with minimal latency (<2s alert delay). 
• Scalability: System should support multiple zones and cameras. 
• Reliability: System should function continuously with auto-recovery. 
• Security: Role-based authentication, encrypted data storage. 
• Usability: User-friendly dashboard for non-technical staff. 
• Maintainability: Modular design for easy updates and bug fixes.
