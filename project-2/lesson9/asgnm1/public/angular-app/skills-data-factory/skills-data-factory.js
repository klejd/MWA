angular.module("meanjobs").factory("skillDataFactory", skillDataFactory)

function skillDataFactory($http) {
    return {
        getAllskills: getAllskills,
        getOneskills: getOneskills,
        addOneskill: addOneskill,
        deleteOneskill: deleteOneskill,
        FullUpdateOneskill: FullUpdateOneskill,
        partialUpdateskill: partialUpdateskill
    };

    function deleteOneSkillIndex(id, skillId) {
        return $http.delete("/api/jobs/" + id + "skills/" + skillId).then(complete).catch(failed);
    }

    function deleteOneskill(id, skillId) {
        return $http.delete("/api/jobs/" + id + "/skills/" + skillId).then(complete).catch(failed);
    }

    function FullUpdateOneskill(id, skillId, skill) {
        return $http.put("/api/jobs/" + id + "/skills/" + skillId, skill)
            .then(complete).catch(failed);
    }

    function partialUpdateskill(id, skillId, skill) {
        return $http.patch("/api/jobs/" + id + "/skills/" + skillId, skill)
            .then(complete).catch(failed);
    }

    function addOneskill(id, skill) {
        return $http.post("/api/jobs/" +
            id + "/skills/", location).then(complete).catch(failed);
    }

    function getAllskills(id) {
        return $http.get("/api/jobs/" + id + "/skills").then(complete).catch(failed);
    };

    function getOneskills(id, skillId) {
        return $http.get("/api/jobs/" + id, "skills/" + skillId).then(complete).catch(failed);
    };

    function complete(response) {
        console.log(response.data);
        return response.data;
    };

    function failed(error) {
        return error.status.statusText;
    }
}