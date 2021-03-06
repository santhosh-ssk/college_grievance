$(document).ready(function(){
    $("form").submit(function(event){
        event.preventDefault();
        ID=login.loginid.value;
	    psw=login.loginpassword.value;
	    //alert(ID);
	    //alert(document.cookie);
	    		var stu="./student_menu.html";	
                var par="./parent_menu.html";
                var fac="./faculty_menu.html";
			$.ajax({
				url: "https://data.bulimic45.hasura-app.io/v1/query",
				contentType: "application/json",
				data: JSON.stringify({
			      "type": "bulk",
			      "args": [
			            {
			                  "type": "select",
			                  "args": {
			                        "table": "student",
			                        "columns": [
			                              "email"
			                        ],
			                        "where": {
			                              "$and": [
			                                    {
			                                          "clg_id": {
			                                                "$eq": ID
			                                          }
			                                    },
			                                    {
			                                          "password": {
			                                                "$eq": psw
			                                          }
			                                    }
			                              ]
			                        }
			                  }
			            },
			            {
			                  "type": "select",
			                  "args": {
			                        "table": "faculty",
			                        "columns": [
			                              "email"
			                        ],
			                        "where": {
			                              "$and": [
			                                    {
			                                          "faculty_id": {
			                                                "$eq":ID
			                                          }
			                                    },
			                                    {
			                                          "password": {
			                                                "$eq": psw
			                                          }
			                                    }
			                              ]
			                        }
			                  }
			            },
			            {
			                  "type": "select",
			                  "args": {
			                        "table": "institute_level_faculty",
			                        "columns": [
			                              "email"
			                        ],
			                        "where": {
			                              "$and": [
			                                    {
			                                          "faculty_id": {
			                                                "$eq":ID
			                                          }
			                                    },
			                                    {
			                                          "password": {
			                                                "$eq": psw
			                                          }
			                                    }
			                              ]
			                        }
			                  }
			            },
			            {
			                  "type": "select",
			                  "args": {
			                        "table": "central_grievance_redressal_faculty",
			                        "columns": [
			                              "email"
			                        ],
			                        "where": {
			                              "$and": [
			                                    {
			                                          "faculty_id": {
			                                                "$eq":ID
			                                          }
			                                    },
			                                    {
			                                          "password": {
			                                                "$eq": psw
			                                          }
			                                    }
			                              ]
			                        }
			                  }
			            }
			      ]
				}),
				type: "POST",
				dataType: "json"
			}).done(function(json) {
				if(json[0].length==0 && json[1].length==0&& json[2].length==0&& json[3].length==0)
					alert("invalid username or password");
				else if(json[0].length==1){
					var statement="update student set count=count+1 where clg_id='"+ID+"';";
					$.ajax({
						url: "https://data.bulimic45.hasura-app.io/v1/query",
						contentType: "application/json",
						headers: {
					      "Authorization": "Bearer 6307f5780d0f3f77e45a2d36c18add112b161e4773aacf78"
						},
						data: JSON.stringify({
					      "type": "run_sql",
					      "args": {
					            "sql": statement
					      }
						}),
						type: "POST",
						dataType: "json"
					}).done(function(json){
							document.cookie=ID+"&"+"student";
							window.open(stu,"_self","location=0");		
								
					}).fail(function(xhr, status, errorThrown) {
						console.log("Error: " + errorThrown);
						console.log("Status: " + status);
						console.dir(xhr);
					});
					
				}
				else if(json[1].length==1){
					document.cookie=ID+"&"+"faculty";
					window.open(fac,"_self","location=0");
				}
				else if(json[2].length==1){
					document.cookie=ID+"&"+"institute_level_faculty";
					window.open(fac,"_self","location=0");
				}
				else if(json[3].length==1){
					document.cookie=ID+"&"+"central_grievance_redressal_faculty";
					window.open(fac,"_self","location=0");
				}
				
			}).fail(function(xhr, status, errorThrown) {
				console.log("Error: " + errorThrown);
				console.log("Status: " + status);
				console.dir(xhr);
			});

    });
});

