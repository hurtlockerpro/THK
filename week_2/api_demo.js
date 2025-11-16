
// ====================================================================
// CLIENT DEMO: JavaScript Fetch
// ====================================================================

const BASE_URL = `http://localhost:${PORT}/tasks`;

async function clientDemo() {
    console.log("--- KLIENDI DEMO ALUSTAMINE (fetch) ---");
    
    // --- 1. GET: Loe kõik ---
    console.log('\n[CLIENT] 1. GET /tasks: loe kõik');
    let response = await fetch(BASE_URL);
    let allTasks = await response.json();
    console.log('Tulemus (200 OK):', allTasks);

    // --- 2. POST: Loo uus ---
    // --- 2. POST: Loo uus ja vaata kogu vastust ---
    console.log('\n[CLIENT] 2. POST /tasks: loo uus ülesanne ja näita kogu vastust');
    
    const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'Uus POST ülesanne' })
    });
    
    // **********************************************
    // 💡 TÄHTIS: Vastuse detailide lugemine:
    // **********************************************
    
    // 1. Olekukood ja olekutekst
    console.log(`Vastuse Olekukood: ${response.status} (${response.statusText})`);
    
    // 2. Päiste lugemine (Headers)
    console.log(`Vastuse Päised (Content-Type): ${response.headers.get('content-type')}`);
    // Vaata kõiki päiseid (võib olla pikk, kasulik vaid debugimisel):
    // console.log('Kõik vastuse päised:', response.headers); 
    
    // 3. Keha lugemine (Body)
    if (response.ok) { // Kontrollib, kas staatus on 200-299
        // KUTSU .json() AINULT ÜHE KORRA, kuna see tarbib vastuse sisu.
        let newTask = await response.json(); 
        console.log('Vastuse keha (201 CREATED):', newTask);
        const newTaskId = newTask.id;
        
        // Jätka demo loogikat
        
        // ... (3. GET, 4. PUT, 5. PATCH, 6. DELETE, 7. GET: - jätka siit, kasutades newTaskId) ...
        
    } else {
        console.error('POST päring ebaõnnestus:', await response.text());
    }

    // --- 3. GET: Loe üks äsja loodud ---
    console.log(`\n[CLIENT] 3. GET /tasks/${newTaskId}: loe spetsiifiline`);
    response = await fetch(`${BASE_URL}/${newTaskId}`);
    let specificTask = await response.json();
    console.log('Spetsiifiline ülesanne (200 OK):', specificTask);

    // --- 4. PUT: Asenda tervikuna ---
    console.log(`\n[CLIENT] 4. PUT /tasks/${newTaskId}: asenda täielikult`);
    response = await fetch(`${BASE_URL}/${newTaskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'PUT - ASENDATUD TÄIELIKULT', completed: true })
    });
    let putResult = await response.json();
    console.log('PUT tulemus (200 OK):', putResult);
    
    // --- 5. PATCH: Osaline uuendus ---
    console.log(`\n[CLIENT] 5. PATCH /tasks/${newTaskId}: muuda ainult pealkirja`);
    response = await fetch(`${BASE_URL}/${newTaskId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'PATCH - ainult pealkiri muudetud' })
    });
    let patchResult = await response.json();
    console.log('PATCH tulemus (200 OK):', patchResult);

    // --- 6. DELETE: Kustuta äsja loodud ---
    console.log(`\n[CLIENT] 6. DELETE /tasks/${newTaskId}: kustuta`);
    response = await fetch(`${BASE_URL}/${newTaskId}`, {
        method: 'DELETE'
    });
    
    // Kontrolli olekukoodi otse
    console.log(`DELETE tulemus: Olekukood ${response.status} (204 NO CONTENT)`);
    
    // --- 7. GET: Kontrolli kustutamist (oota 404) ---
    console.log(`\n[CLIENT] 7. GET /tasks/${newTaskId}: kontrolli kustutamist`);
    response = await fetch(`${BASE_URL}/${newTaskId}`);
    console.log(`Kontrolli olek: ${response.status} (Oodatud 404 NOT FOUND)`);


    console.log('\n--- KLIENDI DEMO LÕPETATUD ---');
    
    // Sulge server 5 sekundi pärast, et vältida protsessi rippumist
    setTimeout(() => {
        server.close(() => {
            console.log('\nSERVER SULETUD.');
        });
    }, 5000);
}

// Kui see on käivitatud skriptina (npm/yarn ei ole vajalik)
// if (process.argv.includes('clientDemo')) {
//     clientDemo();
// }