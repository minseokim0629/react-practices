package ajax.controller.api;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import ajax.domain.Item;
import ajax.dto.JsonResult;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/item")
public class ItemController {
	private final List<Item> items;

	public ItemController(@Qualifier("items") List<Item> items) {
		this.items = items;
	}
	
	// POST /item
	@PostMapping(consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
	public ResponseEntity<JsonResult<Item>> create(Item item, MultipartFile file) {
		try {
			log.info("Request[POST /item, Content-Type: multipart/form-data[{}, {}]", item, file.getOriginalFilename());

			final String saveFileName = UUID
											.randomUUID()
											.toString()
											.concat(".")
											.concat(file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf('.') + 1));
			
			//int index = file.getOriginalFilename().lastIndexOf('.');
			//file.getOriginalFilename().substring(index + 1);
			//file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf('.') + 1);
			
			Files.write(Files.createDirectories(Paths.get("/ajax-practices-uploads/images")).resolve(saveFileName), file.getBytes());
			
			Long maxId = Optional
					.ofNullable(items.isEmpty() ? null : items.getFirst())
					.map(t -> t.getId())
					.get();

			item.setId(maxId + 1);
			item.setImage("/assets/images/" + saveFileName);
			items.addFirst(item);
			
			return ResponseEntity
						.status(HttpStatus.OK)
						.body(JsonResult.success(item));
		} catch (IOException ex) {
			throw new RuntimeException(ex);
		}
	}
		
	// POST /item
	@PostMapping(consumes = {MediaType.APPLICATION_JSON_VALUE})
	public ResponseEntity<JsonResult<Item>> create(@RequestBody Item item) {
		log.info("Request[POST /item, Content-Type: application/json[{}]", item);
		
//		Optional
//		.ofNullable(items.isEmpty() ? null : items.getFirst())
//		.map(new Function<Item, Long>() {
//			@Override
//			public Long apply(Item t) {
//				return t.getId();
//			}
//		});
		Long maxId = Optional
						.ofNullable(items.isEmpty() ? null : items.getFirst())
						.map(t -> t.getId())
						.get();
		//Long maxId = items.getFirst().getId();
		
		item.setId(maxId + 1);
		items.addFirst(item);
		
		return ResponseEntity
					.status(HttpStatus.OK)
					.body(JsonResult.success(item));
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<JsonResult<Item>> read(@PathVariable Long id) {
		log.info("Request[GET /item/{}]", id);
		
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(JsonResult.success(items
						.stream() // list<item>을 stream<item>으로 변환
						.filter(t -> t.getId() == id)
						.findAny() // id 같은 것 중 하나만 가져옴
						.orElse(null)));
	}
	// GET /item  : [{}, {}, {}...]
	@GetMapping
	public ResponseEntity<JsonResult<List<Item>>> read() {
		log.info("Request[GET /item]");
		
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(JsonResult.success(items));
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<JsonResult<Item>> update(@PathVariable Long id, Item item) {
		log.info("Request[PUT /item/{}, Content-Type: application/x-www-form-urlencoded[{}]", id, item);
//		int index = items.indexOf(new Item(id));
//		Item itemUpdate = items.get(index);
//		itemUpdate.setName(item.getName());
//		itemUpdate.setType(item.getType());
		
		int index = items.indexOf(new Item(id));
		Optional<Item> optionalItem = Optional.ofNullable(index == -1 ? null : items.get(index)); // new Item(id)
		
//		optionalItem.ifPresent(new Consumer<Item>() {
//			@Override
//			public void accept(Item t) {
//				t.setName(item.getName());
//				t.setType(item.getType());
//			}
//		});
		optionalItem.ifPresent((Item t) -> {
			t.setName(item.getName());
			t.setType(item.getType());
		});
		
		return ResponseEntity
					.status(HttpStatus.OK)
					.body(JsonResult.success(optionalItem.orElse(null)));
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<JsonResult<Long>> delete(@PathVariable Long id) {
		log.info("Request[DELETE /item/{}", id);
		
//		items.removeIf(new Predicate<Item>() {
//			@Override
//			public boolean test(Item t) {
//				return t.getId() == id;
//			}
//		});
		
		//boolean result = items.removeIf(t -> t.getId() == id);
		
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(JsonResult.success(items.removeIf(t -> t.getId() == id) ? id : -1));
	}
}
