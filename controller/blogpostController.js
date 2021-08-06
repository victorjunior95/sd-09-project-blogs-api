const stateCreated = 201;
const stateBadRequest = 400;

const replyTitle = (answer) => {
  if (answer === 'Field \'title\' doesn\'t have a default value') {
    return { code: stateBadRequest, phrase: '"title" is required' };
  }
};

const replyContent = (answer) => {
  if (answer === 'Field \'content\' doesn\'t have a default value') {
    return { code: stateBadRequest, phrase: '"content" is required' };
  }
};

const replyCategoryIds = (answer) => {
  if (answer === 'WHERE parameter "id" has invalid "undefined" value') {
    return { code: stateBadRequest, phrase: '"categoryIds" is required' }
  }
  if (answer.length === 0) {
    return { code: stateBadRequest, phrase: '"categoryIds" not found'}
  }

//   // if (answer === '') {   
//   //   return { code: stateBadRequest, phrase: '"categoryId" is required'}
//   // }   aguardando  tabela de ids


// return { code: stateBadRequest, phrase: `  dfasdfasdfa ${answer}`}

}

const createBlogpostError = (answer) => {

  const categoryIdsError = replyCategoryIds(answer);
  if (categoryIdsError) return categoryIdsError;

  const titleError = replyTitle(answer);
  if (titleError) return titleError;

  const contentError = replyContent(answer);
  if (contentError) return contentError;

};

const createBlogpostOk = ({ id, userId, title, content }) => {
  const blogpost = {
    id, 
    userId, 
    title, 
    content,
  };

  return { code: stateCreated, blogpost };
};

module.exports = {
  createBlogpostOk,
  createBlogpostError,
}