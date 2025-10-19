// دالة الإرسال من صفحة add_app.html
function submitApp() {
    const name = document.getElementById("appName").value.trim();
    const company = document.getElementById("company").value.trim();
    const website = document.getElementById("website").value.trim();
    const isFree = document.getElementById("isFree").value;
    const category = document.getElementById("category").value;
    const desc = document.getElementById("description").value.trim();
    const result = document.getElementById("result");

    const nameRegex = /^[A-Za-z]+$/;
    const companyRegex = /^[A-Za-z\s]+$/;

    if (!nameRegex.test(name)) {
        result.style.color = "red";
        result.textContent = "❌ اسم التطبيق يجب أن يحتوي على أحرف إنجليزية فقط بدون فراغات.";
        return;
    }
    if (!companyRegex.test(company)) {
        result.style.color = "red";
        result.textContent = "❌ اسم الشركة يجب أن يحتوي على أحرف إنجليزية فقط.";
        return;
    }
    if (!website.startsWith("http")) {
        result.style.color = "red";
        result.textContent = "❌ أدخل رابط موقع صحيح يبدأ بـ http أو https.";
        return;
    }
    if (!isFree || !category || desc.length < 10) {
        result.style.color = "red";
        result.textContent = "❌ يرجى تعبئة جميع الحقول بشكل صحيح.";
        return;
    }

    const newApp = { name, company, website, isFree, category, desc };

    let apps = JSON.parse(localStorage.getItem("appsList")) || [];
    apps.push(newApp);
    localStorage.setItem("appsList", JSON.stringify(apps));

    result.style.color = "#27ae60";
    result.textContent = "✅ تم حفظ التطبيق بنجاح!";

    setTimeout(() => {
        window.location.href = "apps.html";
    }, 1000);
}

window.addEventListener("DOMContentLoaded", () => {
    const tableBody = document.querySelector("tbody");
    if (!tableBody) return;

    const apps = JSON.parse(localStorage.getItem("appsList")) || [];

    apps.forEach((app, index) => {
        const mainRow = document.createElement("tr");
        mainRow.innerHTML = `
            <td>${app.name}</td>
            <td>${app.company}</td>
            <td>${app.category}</td>
            <td>${app.isFree}</td>
            <td>
                <button onclick="toggleDetails('user${index}')">إظهار التفاصيل</button>
                <button class="delete-btn" onclick="deleteApp(${index})">🗑️ حذف</button>
            </td>
        `;
        tableBody.appendChild(mainRow);

        const detailsRow = document.createElement("tr");
        detailsRow.id = `user${index}`;
        detailsRow.className = "details";
        detailsRow.innerHTML = `
            <td colspan="5">
                <img src="images/default.jpg" alt="${app.name}" width="120"><br>
                <strong>وصف:</strong> ${app.desc}<br>
                <strong>رابط الموقع:</strong> <a href="${app.website}" target="_blank">${app.website}</a>
            </td>
        `;
        tableBody.appendChild(detailsRow);
    });
});

// دالة إظهار / إخفاء التفاصيل
function toggleDetails(id) {
    const row = document.getElementById(id);
    if (row.style.display === "table-row") {
        row.style.display = "none";
    } else {
        row.style.display = "table-row";
    }
}

// دالة حذف التطبيق
function deleteApp(index) {
    let apps = JSON.parse(localStorage.getItem("appsList")) || [];
    const confirmDelete = confirm(`هل تريد حذف التطبيق "${apps[index].name}"؟`);
    if (!confirmDelete) return;

    apps.splice(index, 1);
    localStorage.setItem("appsList", JSON.stringify(apps));

    alert(" تم حذف التطبيق بنجاح!");
    window.location.reload(); // إعادة تحميل الصفحة لتحديث الجدول
}
