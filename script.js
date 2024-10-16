$(document).ready(function() {
    // Function to reset form fields
    function resetForm() {
        $('#studentForm')[0].reset();
        $('#rollNo').prop('disabled', false);
        $('#fullName, #class, #birthDate, #address, #enrollmentDate').prop('disabled', true);
        $('#saveBtn, #updateBtn').prop('disabled', true);
        $('#rollNo').focus();
    }

    // Initial form reset on page load
    resetForm();

    // Check if the primary key exists in the database (on blur of Roll No)
    $('#rollNo').on('blur', function() {
        const rollNo = $('#rollNo').val();
        if (rollNo) {
            $.ajax({
                url: 'http://localhost:3000/students/' + rollNo,
                method: 'GET',
                success: function(data) {
                    if (data) {
                        // Roll No exists, populate the form and enable Update/Reset
                        $('#fullName').val(data.fullName);
                        $('#class').val(data.class);
                        $('#birthDate').val(data.birthDate);
                        $('#address').val(data.address);
                        $('#enrollmentDate').val(data.enrollmentDate);

                        $('#rollNo').prop('disabled', true);
                        $('#fullName, #class, #birthDate, #address, #enrollmentDate').prop('disabled', false);
                        $('#saveBtn').prop('disabled', true);
                        $('#updateBtn').prop('disabled', false);
                    }
                },
                error: function() {
                    // Roll No does not exist, enable Save/Reset buttons and allow form data input
                    $('#fullName, #class, #birthDate, #address, #enrollmentDate').prop('disabled', false);
                    $('#saveBtn').prop('disabled', false);
                    $('#updateBtn').prop('disabled', true);
                }
            });
        }
    });

    // Save new student data
    $('#saveBtn').click(function() {
        const studentData = {
            rollNo: $('#rollNo').val(),
            fullName: $('#fullName').val(),
            class: $('#class').val(),
            birthDate: $('#birthDate').val(),
            address: $('#address').val(),
            enrollmentDate: $('#enrollmentDate').val()
        };

        // Save to JSON-DB
        $.ajax({
            url: 'http://localhost:3000/students',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(studentData),
            success: function() {
                alert('Student data saved successfully!');
                resetForm();
            }
        });
    });

    // Update existing student data
    $('#updateBtn').click(function() {
        const rollNo = $('#rollNo').val();
        const studentData = {
            fullName: $('#fullName').val(),
            class: $('#class').val(),
            birthDate: $('#birthDate').val(),
            address: $('#address').val(),
            enrollmentDate: $('#enrollmentDate').val()
        };

        // Update in JSON-DB
        $.ajax({
            url: 'http://localhost:3000/students/' + rollNo,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(studentData),
            success: function() {
                alert('Student data updated successfully!');
                resetForm();
            }
        });
    });

    // Reset form
    $('#resetBtn').click(function() {
        resetForm();
    });
});
