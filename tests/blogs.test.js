const Page = require('./helpers/page');
let page;


beforeEach(async ()=>{
    page = await Page.build();
    await page.goto('http://localhost:3000');
});

afterEach(async ()=>{
    await page.close();
});




describe('When Logged in, ', async ()=>{
    beforeEach(async ()=>{
        await page.login();
        await page.click('.btn-floating.btn-large.red');
    });
    test('can see blog create form', async () => {
        const label = await page.getContentOf('form label');
        expect(label).toEqual('Blog Title')
    });

    describe('and using invalid inputs', async () => {
        beforeEach(async ()=>{
            await page.click('form button');
        });

        test('Submitting show errors', async ()=>{
            const titleError = await page.getContentOf('.title .red-text');
            const contentError = await page.getContentOf('.content .red-text');

            expect(titleError).toEqual('You must provide a value');
            expect(contentError).toEqual('You must provide a value');
        });
    });

    describe('and using valid inputs', async () => {
        beforeEach(async ()=>{
            await page.type('.title input', 'My title');
            await page.type('.content input', 'My content');
            await page.click('form button');
        });


        test('Submitting takes the user to review screnn', async ()=>{
            const text = await page.getContentOf('h5');
            expect(text).toEqual('Please confirm your entries');
        });

        test('Submitting then saving adds blog to index page', async ()=>{
            await page.click('button.green');
            await page.waitFor('.card');
            const title = await page.getContentOf('.card-title');
            const content = await page.getContentOf('p');
            expect(title).toEqual('My title');
            expect(content).toEqual('My content');
        })
    })
    
    

});

describe('User is not logged in', async ()=>{
    test('User can not create blog post', async ()=>{
        const result = await page.post('/api/blogs', { title: 'T', content: 'C'})
        
        expect(result).toEqual({error: 'You must log in!'});
    });

    test('User can not get a list of blog post', async ()=>{
        const result = await page.get('/api/blogs');
        expect(result).toEqual({ error: 'You must log in!' });
    })
})



