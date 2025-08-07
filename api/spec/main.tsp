import "@typespec/http";
import "@typespec/openapi3";
import "./common/types.tsp";
import "./common/errors.tsp";
import "./models/user.tsp";
import "./models/quiz.tsp";
import "./models/attempt.tsp";
import "./models/deck.tsp";
import "./models/tag.tsp";
import "./operations/quiz-management.tsp";
import "./operations/quiz-learning.tsp";
import "./operations/user-session.tsp";
import "./operations/search.tsp";

using Http;

@service()
namespace YourQuizAPI;