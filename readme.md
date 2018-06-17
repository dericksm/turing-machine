Máquina de Turing
Desenvolvimento web básico com:
Javascript
Jquery
Bootstrap 4

Para usar precisar de conexão com internet, os links dos frameworks são referenciados, depois de clonar o repositório você só precisa abrir o arquivo index.html e utilizar conforme as regras descritas na página.

Exemplos de Máquinas de Turing:
Soma
q_,_ -> q1,_,>\nq1,1 -> q1,1,>\nq1,0 -> q2,1,>\nq2,1 -> q2,1,>\nq2,0 -> q3,0,<\nq3,1 -> q3,0,$

Números de A's e B's iguais
q_,_ -> q0,_,>\nq0,A -> q1,X,>\nq0,B -> q2,X,>\nq0,X -> q0,X,>\nq0,_ -> q0,_,>\nq0,0 -> q0,0,$\nq1,A -> q1,A,>\nq1,B -> qX,X,<\nq1,_ -> q1,_,$\nq2,A -> qX,X,<\nq2,B -> q2,B,>\nq2,_ -> q2,_,$\nqX,A -> qX,A,<\nqX,B -> qX,B,<\nqX,X -> qX,X,<\nqX,_ -> q0,_,>\n