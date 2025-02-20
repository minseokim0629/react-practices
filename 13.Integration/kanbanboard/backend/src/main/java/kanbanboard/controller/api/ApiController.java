package kanbanboard.controller.api;



import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import kanbanboard.domain.Card;
import kanbanboard.domain.Task;
import kanbanboard.dto.JsonResult;
import kanbanboard.repository.CardRepository;
import kanbanboard.repository.TaskRepository;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/kanbanboard")
public class ApiController {

	private final CardRepository cardRepository;
	private final TaskRepository taskRepository;

	public ApiController(CardRepository cardRepository, TaskRepository taskRepository) {
		this.cardRepository = cardRepository;
		this.taskRepository = taskRepository;
	}
	
	@PostMapping("/task")
	public ResponseEntity<JsonResult<Task>> create(@RequestBody Task task) {
		log.info("Request[POST /task, Content-Type: application/json[{}]", task);
		
		return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success(taskRepository.insert(task) ? task : null));
	}
	
	@GetMapping("/card")
	public ResponseEntity<JsonResult<List<Card>>> read() {
		log.info("Request[GET /card]");
		List<Card> cards = cardRepository.findAll();
		
		System.out.println(cards);
		return ResponseEntity
					.status(HttpStatus.OK)
					.body(JsonResult.success(cards));
	}
	
	@GetMapping("/task")
	public ResponseEntity<JsonResult<List<Task>>> read(@RequestParam(value="card", required=true, defaultValue="-1") Long cardNo) {
		log.info("Request[GET /task/{}]", cardNo);
		List<Task> tasks = taskRepository.findAllByCardNo(cardNo);
	
		return ResponseEntity
					.status(HttpStatus.OK)
					.body(JsonResult.success(tasks));
	}
	
	@PutMapping("/task/{no}")
	public ResponseEntity<JsonResult<Map<String, Object>>> update(@PathVariable Long no, @RequestParam(value="done", required=true, defaultValue="N") String doneTask) {
		 log.info("Request[PUT /task/{}, Content-Type: application/x-www-form-urlencoded[{}]", no, doneTask);

		return ResponseEntity
					.status(HttpStatus.OK)
					.body(JsonResult.success(taskRepository.updateDone(no, doneTask) ? Map.of("no", no, "done", doneTask) : null));
	}
	
	@DeleteMapping("/task/{no}")
	public ResponseEntity<JsonResult<Long>> delete(@PathVariable Long no) {
		log.info("Request[DELETE /task/{}]", no);

		return ResponseEntity
					.status(HttpStatus.OK)
					.body(JsonResult.success(taskRepository.delete(no) ? no : -1));
	}
}
