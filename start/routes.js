'use strict'



/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('index')

Route.group(()=>{

    Route.post('/question/store','questionController.store')
    
    Route.post('/question/update/:id','questionController.update')
    
    Route.on('/question/add').render('questions.add')
    Route.get('/question/edit/:id','questionController.edit')
    
    Route.get('/question/delete/:id','questionController.delete')

    Route.get('/myQuestions','userController.questions')

    Route.post('/vote/add','voteController.add')

    Route.get('/logout',async ({auth,response}) => {
        await auth.logout()
        return response.redirect('/')
    })

    Route.post('/question/:id/answer/add','answerController.add')

}).middleware(['auth'])

Route.post('/search','questionController.search') 
Route.get('/question/:id/answers','questionController.answers')

Route.on('/login').render('auth/login')
Route.on('/register').render('auth/register')

Route.post('/login','userController.login')
Route.post('/register','userController.create')

