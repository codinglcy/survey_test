<div align="center"> <h1>설문지 API 기능구현 과제</h1> </div>

<h2>기술</h2>
   <p>typescript<br>
   nest.js<br>
   graphql<br>
   typeorm<br>
   postgresql</p><br>

   <h2>기간 및 노션링크</h2>
   <p>2023.11.28 ~ 2023.12.04<br>
   https://www.notion.so/codinglcy/Typescript-GraphQL-TypeORM-d0eb22a79a60483499fbbdef8c2d952b?pvs=4</p><br>

  <h2>내용</h2>
   <h3>객관식 설문지의 데이터베이스 설계</h3>
   <p>답변별 점수가 존재한다.<br>
   설문지는 답변을 체크할 수 있다.<br>
   답변의 총점을 확인할 수 있다.</p><br>
   
   <h3>API 기능 구현</h3>
   <p>설문지  CRUD<br>
   문항 CRUD<br>
   선택지 CRUD<br>
   답변 CRUD<br>
   설문지 완료<br>
   완료된 설문지 확인</p><br><br>
   
   <h3>에러 처리</h3>
   <p>요청 실패 시 적절한 에러를 리턴해야 합니다.<br>
   에러 응답에 제한은 없지만 일관되게 응답해야 합니다.</p><br>
   
   <h3>로그</h3>
   <p>에러 및 특이사항 발생시 로그를 확인하여 대처할 수 있게 작성</p><br>

<h2>API</h2>
<h3>Survey</h3>

```
type Query {
  getAllSurvey: [SurveyDto!]!
  getSurveyById(id: String!): SurveyDto!
}

type Mutation {
  createSurvey(data: inputSurvey!): SurveyDto!
  updateSurvey(data: updateSurvey!): SurveyDto!
  deleteSurvey(id: String!): deleteSurveyResult!
}
```

<br>

<h3>Question</h3>

```
type Query {
  getAllQuestion: [QuestionDto!]!
  getQuestionById(id: String!): QuestionDto!
}

type Mutation {
  createQuestion(data: inputQuestion!): QuestionDto!
  updateQuestion(data: updateQuestion!): QuestionDto!
  deleteQuestion(id: String!): deleteQuestionResult!
}
```

<br>

<h3>Choice</h3>

```
type Query {
  getAllChoice: [ChoiceDto!]!
  getChoiceById(id: String!): ChoiceDto!
}

type Mutation {
  createChoice(data: inputChoice!): ChoiceDto!
  updateChoice(data: updateChoice!): ChoiceDto!
  deleteChoice(id: String!): deleteChoiceResult!
}
```
<br>

<h3>Answer</h3>

```
type Query {
  getAllAnswer: [AnswerDto!]!
  getAnswerById(id: String!): AnswerDto!
  getSurveyAnswersByUser(surveyId: String!, user: String!): [AnswerDto!]!
  getSurveyScore(surveyId: String!): Float!
  getSurveyScoreByUser(surveyId: String!, user: String!): Float!
}

type Mutation {
  createAnswer(data: inputAnswer!): AnswerDto!
  updateAnswer(data: updateAnswer!): AnswerDto!
  deleteAnswer(id: String!): deleteAnswerResult!
}
```

<h2>디렉토리 구조</h2>

```
📦dist
📦node_modules
📦src
 ┣ 📂answers
 ┃ ┣ 📂test
 ┃ ┃ ┣ 📜answers.resolver.spec.ts
 ┃ ┃ ┗ 📜answers.service.spec.ts
 ┃ ┣ 📜answers.entity.ts
 ┃ ┣ 📜answers.module.ts
 ┃ ┣ 📜answers.resolver.ts
 ┃ ┣ 📜answers.service.ts
 ┃ ┗ 📜answers.types.ts
 ┣ 📂choices
 ┃ ┣ 📂test
 ┃ ┃ ┣ 📜choices.resolver.spec.ts
 ┃ ┃ ┗ 📜choices.service.spec.ts
 ┃ ┣ 📜choices.entity.ts
 ┃ ┣ 📜choices.module.ts
 ┃ ┣ 📜choices.resolver.ts
 ┃ ┣ 📜choices.service.ts
 ┃ ┗ 📜choices.types.ts
 ┣ 📂questions
 ┃ ┣ 📂test
 ┃ ┃ ┣ 📜questions.resolver.spec.ts
 ┃ ┃ ┗ 📜questions.service.spec.ts
 ┃ ┣ 📜questions.entity.ts
 ┃ ┣ 📜questions.module.ts
 ┃ ┣ 📜questions.resolver.ts
 ┃ ┣ 📜questions.service.ts
 ┃ ┗ 📜questions.types.ts
 ┣ 📂surveys
 ┃ ┣ 📂test
 ┃ ┃ ┣ 📜surveys.resolver.spec.ts
 ┃ ┃ ┗ 📜surveys.service.spec.ts
 ┃ ┣ 📜surveys.entity.ts
 ┃ ┣ 📜surveys.module.ts
 ┃ ┣ 📜surveys.resolver.ts
 ┃ ┣ 📜surveys.service.ts
 ┃ ┗ 📜surveys.types.ts
 ┣ 📜app.module.ts
 ┣ 📜error.dto.ts
 ┗ 📜main.ts
📦test
📜.env
📜.eslintrc.js
📜.prettierrc
📜nest-cli.json
📜package-lock.json
📜package.json
📜README.md
📜schema.gql
📜tsconfig.build.json
📜tsconfig.json
```


